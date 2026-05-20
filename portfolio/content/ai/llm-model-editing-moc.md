---
tags:
  - llm
  - model-editing
  - moc
aliases:
  - LLM Editing MOC
---

# LLM Model Editing — Map of Content

> Hướng dẫn chọn và áp dụng kỹ thuật chỉnh sửa kiến thức/hành vi trong LLM. Nguyên tắc cốt lõi: **chọn layer can thiệp nông nhất đủ giải quyết vấn đề**.

## Tại Sao Không Phải Lúc Nào Cũng Chỉnh Sửa Model?

Phần lớn vấn đề có thể giải quyết mà không cần chạm model:

- **Prompt/system prompt**: policy thay đổi nhanh, rollback tức thì — không cần train. Nếu vấn đề là hành vi không mong muốn trong một context cụ thể, sửa system prompt trước.
- **RAG/retrieval filter**: tri thức nằm ở source layer → sửa source, không sửa model. Nếu model trả lời sai vì outdated knowledge, cập nhật knowledge base trước.
- **Output moderation**: chặn hoặc rewrite ở output layer mà không cần đụng weights.

Chỉ tiến vào model-level intervention khi: tri thức đã nằm trong weights và không thể kiểm soát từ ngoài, hoặc khi yêu cầu compliance/legal đòi hỏi proof-of-removal có thể kiểm chứng.

## Intervention Ladder

```
[Prompt / System prompt]           ← zero training, rollback ngay
       ↓
[RAG / retrieval filter]           ← source-level, không train
       ↓
[SFT / DPO / RLHF]                 ← behavioral preference, cần data + compute
       ↓
[LoRA / adapter]                    ← reversible, domain-specific, swap được
       ↓
[Knowledge editing]                 ← fact cụ thể, ROME/MEMIT
       ↓
[Task vectors / model merging]      ← weight-space composition
       ↓
[Machine unlearning]                ← xóa có bằng chứng định lượng
       ↓
[Activation steering]               ← runtime latent control
       ↓
[Neuron / circuit / feature edits]  ← interpretability-driven surgery
       ↓
[Abliteration]                      ← research only, KHÔNG production
```

Mỗi bước xuống ladder: invasiveness tăng, reversibility giảm, cost tăng. Không bỏ qua bước nếu bước trên chưa được thử.

## Tradeoff Matrix

| Method | Invasiveness | Reversibility | Cost | Proof-of-effect | Audience |
|---|---|---|---|---|---|
| Prompt/system | None | Instant | Minimal | Hard | Any |
| RAG filter | Low | Easy | Low | Moderate | Any |
| [[Preference Learning - DPO & RLHF\|SFT/DPO/RLHF]] | Medium | Retrain | High | Moderate | ML team |
| [[LoRA & PEFT\|LoRA/PEFT]] | Medium | Swap adapter | Medium | Moderate | ML team |
| [[Knowledge Editing - ROME & MEMIT\|ROME/MEMIT]] | High | Reverse patch | Low | High | Research |
| [[Task Vectors & Model Merging\|Task Vectors]] | High | Keep sources | Low-Medium | Moderate | ML team |
| [[Machine Unlearning]] | High | Retrain | High | High | ML + Legal |
| [[Activation Steering]] | Runtime | Remove hook | Low | High | Research |
| [[Neuron, Circuit & Feature Edits\|Circuit Edits]] | High | Reverse patch | Very High | High | Research |
| [[Abliteration]] | Very high | Retrain | Low | N/A | Research only |

**Ghi chú cột Proof-of-effect**: "High" nghĩa là có định lượng được — ví dụ ROUGE-L, MIA score, extraction attack pass rate. "Hard" nghĩa là khó đo trực tiếp, chỉ kiểm tra được heuristically.

## Decision Guide: Tín Hiệu → Method

| Tín hiệu lỗi | Method ưu tiên | Lý do |
|---|---|---|
| Model trả lời sai 1 fact hẹp | [[Knowledge Editing - ROME & MEMIT\|ROME/MEMIT]] → RAG | Targeted, fast, high specificity |
| Model nhớ PII/copyright | [[Machine Unlearning]] + extraction eval | Cần proof-of-removal cho compliance |
| Model quá toxic hoặc over-refuse | [[Preference Learning - DPO & RLHF\|DPO]] + [[Activation Steering]] | Behavior shaping hoặc runtime nudge |
| Domain fine-tune xóa safety | [[LoRA & PEFT\|SafeLoRA]] + [[Task Vectors & Model Merging\|SafeMERGE]] | Restore safety while keeping domain skill |
| Cần kết hợp nhiều domain skills | [[Task Vectors & Model Merging]] | Weight-space composition |
| Nghiên cứu refusal mechanism | [[Abliteration]] (sandbox only) | Case study về safety fragility |
| Cần runtime behavioral control | [[Activation Steering]] | Reversible, no retraining |
| Muốn hiểu cơ chế behavior | [[Neuron, Circuit & Feature Edits]] | Interpretability-first approach |

> [!tip] Nguyên tắc triage
> Khi không chắc nên dùng method nào: bắt đầu từ tín hiệu lỗi cụ thể nhất. "Model trả lời sai" quá rộng. "Model trả lời sai fact X trong context Y" → ROME/MEMIT. "Model refuse quá nhiều request benign" → DPO hoặc Activation Steering tùy scale.

## Nguyên Tắc Cross-Cutting

**1. Eval không phải tùy chọn**

Mọi intervention cần ba loại eval: forget quality eval (model đã quên gì), retain quality eval (model còn giữ gì), và safety eval (model có an toàn không). Không có eval = không có proof. Xem [[Evaluation Framework]] để biết cụ thể metrics và code.

**2. Defense in depth**

Model-level safety không thể là single point of failure. Hệ thống production cần ít nhất ba layer: prompt/policy layer + moderation layer + model-level. Bất kỳ layer nào cũng có thể bypass, nhưng bypass cả ba cùng lúc khó hơn nhiều.

**3. Retain set bắt buộc**

Với bất kỳ intervention nào, định nghĩa retain set trước khi bắt đầu. Retain set = tập dữ liệu mà model phải giữ nguyên capability sau intervention. Không có retain set → không biết capability đã bị ảnh hưởng ra sao → không thể deploy an toàn.

**4. Rollback plan**

Luôn giữ source checkpoint và intervention config được version-controlled. Rollback phải là một thao tác đơn giản, lý tưởng nhất là một command duy nhất. Nếu rollback phức tạp hơn thế, intervention chưa sẵn sàng production.

**5. Kiểm tra sau mỗi pipeline step**

Fine-tune, adapter merge, quantization, và compression đều có thể gây drift safety hoặc capability. Chạy safety regression sau mỗi step trong pipeline, không chỉ ở cuối. Đặc biệt cần kiểm tra: quantization từ fp16 xuống int4 đôi khi thay đổi behavior đáng kể.

**6. Adversarial eval là bắt buộc**

Direct recall không đủ. Phải kiểm tra extraction qua paraphrase, multi-turn, indirect prompting, và roleplay framing. Model có thể pass direct recall nhưng leak qua indirect paths.

## Mối Quan Hệ Giữa Các Methods

Một số kết hợp thường gặp trong thực tế:

- **ROME/MEMIT + Eval**: knowledge editing luôn cần specificity eval để đảm bảo edit không lan ra ngoài scope.
- **DPO + Activation Steering**: DPO thay đổi preference distribution lâu dài; Activation Steering bổ sung runtime nudge khi cần fine-grained control mà không retrain.
- **LoRA + Task Vectors**: train domain LoRA riêng, sau đó dùng task arithmetic để merge nhiều domains mà không interference.
- **Machine Unlearning + Extraction Eval**: unlearning không có extraction attack eval là unlearning chưa hoàn chỉnh — model có thể "quên" direct recall nhưng vẫn leak qua adversarial paths.

## Method Notes

- [[Abliteration]] — Xóa refusal direction; fragile, research only
- [[Activation Steering]] — Inject steering vector lúc inference
- [[Knowledge Editing - ROME & MEMIT]] — Sửa fact cụ thể trong MLP weights
- [[Machine Unlearning]] — Xóa kiến thức có proof định lượng
- [[Preference Learning - DPO & RLHF]] — Thay đổi preference distribution
- [[LoRA & PEFT]] — Parameter-efficient fine-tuning với adapter
- [[Task Vectors & Model Merging]] — Weight-space composition, TIES/DARE/SafeMERGE
- [[Neuron, Circuit & Feature Edits]] — Interpretability-driven surgery
- [[Evaluation Framework]] — Eval pipeline đầy đủ cho mọi method
