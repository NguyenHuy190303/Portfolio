const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/certificates');
const outputDir = path.join(__dirname, '../public/certificates');

// Image optimization settings
const QUALITY = 85;
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 900;

async function optimizeImages() {
  try {
    // Check if input directory exists
    if (!fs.existsSync(inputDir)) {
      console.error('❌ Input directory does not exist:', inputDir);
      return;
    }

    // Get all PNG files in the certificates directory
    const files = fs.readdirSync(inputDir).filter(file => 
      file.toLowerCase().endsWith('.png')
    );

    if (files.length === 0) {
      console.log('⚠️  No PNG files found in', inputDir);
      return;
    }

    console.log(`🔄 Found ${files.length} images to optimize...`);

    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const baseName = path.parse(file).name;
      const webpPath = path.join(outputDir, `${baseName}.webp`);
      const optimizedPngPath = path.join(outputDir, `${baseName}_optimized.png`);

      try {
        // Get original file stats
        const originalStats = fs.statSync(inputPath);
        const originalSizeKB = Math.round(originalStats.size / 1024);

        console.log(`📄 Processing: ${file} (${originalSizeKB} KB)`);

        // Get image metadata
        const metadata = await sharp(inputPath).metadata();
        console.log(`   📐 Original: ${metadata.width}x${metadata.height}`);

        // Calculate new dimensions while maintaining aspect ratio
        let newWidth = metadata.width;
        let newHeight = metadata.height;

        if (newWidth > MAX_WIDTH || newHeight > MAX_HEIGHT) {
          const widthRatio = MAX_WIDTH / newWidth;
          const heightRatio = MAX_HEIGHT / newHeight;
          const ratio = Math.min(widthRatio, heightRatio);
          
          newWidth = Math.round(newWidth * ratio);
          newHeight = Math.round(newHeight * ratio);
        }

        // Create WebP version with optimization
        await sharp(inputPath)
          .resize(newWidth, newHeight, {
            kernel: sharp.kernel.lanczos3,
            withoutEnlargement: true
          })
          .webp({ 
            quality: QUALITY,
            effort: 6, // Maximum compression effort
            smartSubsample: true
          })
          .toFile(webpPath);

        // Create optimized PNG as fallback
        await sharp(inputPath)
          .resize(newWidth, newHeight, {
            kernel: sharp.kernel.lanczos3,
            withoutEnlargement: true
          })
          .png({ 
            quality: QUALITY,
            compressionLevel: 9,
            progressive: true
          })
          .toFile(optimizedPngPath);

        // Get output file stats
        const webpStats = fs.statSync(webpPath);
        const pngStats = fs.statSync(optimizedPngPath);
        const webpSizeKB = Math.round(webpStats.size / 1024);
        const pngSizeKB = Math.round(pngStats.size / 1024);

        const webpSavings = Math.round(((originalSizeKB - webpSizeKB) / originalSizeKB) * 100);
        const pngSavings = Math.round(((originalSizeKB - pngSizeKB) / originalSizeKB) * 100);

        console.log(`   ✅ WebP: ${webpSizeKB} KB (${webpSavings}% savings)`);
        console.log(`   ✅ PNG: ${pngSizeKB} KB (${pngSavings}% savings)`);
        console.log(`   📐 New size: ${newWidth}x${newHeight}`);

        // Replace original with optimized PNG
        fs.renameSync(optimizedPngPath, inputPath);

      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
      }
    }

    console.log('\n🎉 Image optimization complete!');
    console.log('\n📊 Summary:');
    console.log('   • Original PNG files have been optimized in-place');
    console.log('   • WebP versions created for modern browsers');
    console.log('   • Images resized to web-appropriate dimensions');
    console.log('   • Maintained aspect ratios and quality');

  } catch (error) {
    console.error('❌ Error during image optimization:', error);
  }
}

// Run if called directly
if (require.main === module) {
  optimizeImages();
}

module.exports = { optimizeImages };
