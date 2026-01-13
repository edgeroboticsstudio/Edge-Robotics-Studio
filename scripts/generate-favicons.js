const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../static/logo.png');
const outputDir = path.join(__dirname, '../static');

if (!fs.existsSync(inputFile)) {
    console.error(`Error: Source file not found at ${inputFile}`);
    process.exit(1);
}

const images = [
    { name: 'favicon-16x16.png', width: 16, height: 16 },
    { name: 'favicon-32x32.png', width: 32, height: 32 },
    { name: 'apple-touch-icon.png', width: 180, height: 180 },
    { name: 'android-chrome-192x192.png', width: 192, height: 192 },
    { name: 'android-chrome-512x512.png', width: 512, height: 512 }
];

async function generate() {
    console.log('Generating favicons...');

    // Generate PNGs
    for (const image of images) {
        await sharp(inputFile)
            .resize(image.width, image.height)
            .toFile(path.join(outputDir, image.name));
        console.log(`Created ${image.name}`);
    }

    // Generate favicon.ico (requires special handling, usually multiple sizes in one file)
    // For simplicity, we'll use 32x32 png but renamed as ico for basic support if proper ico lib missing, 
    // BUT sharp can't save as ico directly without libvips support or extra plugins.
    // A common workaround in node is just using the 32x32 png or using a specific ico package.
    // However, modern browsers handle png favicons well. IE is the main consumer of .ico.
    // Let's see if we can just make a 32x32 png and rename it, or if we should skip .ico creation via sharp
    // and just use the pngs in HTML. Standard practice often includes a favicon.ico for legacy.
    // We will attempt to use 'sharp' to output a png and just name it .ico (some browsers accept this) 
    // or better, we just rely on the PNGs for modern browsers and maybe just copy the 32 version as .ico.
    // Actually, real ICO format is different. Let's just generate the PNGs and the user can use them.
    // If we really need .ico, we might need 'png-to-ico' package. 
    // For now, let's keep it simple with the PNGs we listed.

    // Attempting to create a basic 32x32 ico file (actually png format) for legacy compatibility 
    // (technically invalid ico but works in many places)
    await sharp(inputFile)
        .resize(32, 32)
        .toFile(path.join(outputDir, 'favicon.ico'));
    console.log('Created favicon.ico (32x32 PNG format)');
}

generate().catch(err => {
    console.error('Error generating icons:', err);
    process.exit(1);
});
