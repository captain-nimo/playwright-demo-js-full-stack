import fs from 'fs';
import path from 'path';

/**
 * Check if environment file exists and has required variables
 */
function checkEnv() {
  const projectRoot = process.cwd();
  const envPath = path.join(projectRoot, 'config', '.env');
  const examplePath = path.join(projectRoot, 'config', '.env.example');

  if (!fs.existsSync(envPath)) {
    console.log('⚠️  .env file not found');
    console.log(`Creating from .env.example...`);

    if (fs.existsSync(examplePath)) {
      fs.copyFileSync(examplePath, envPath);
      console.log('✓ .env file created from .env.example');
    } else {
      console.warn('✗ .env.example not found');
      process.exit(1);
    }
  } else {
    console.log('✓ .env file exists');
  }

  // Load and validate
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'BASE_UI_URL',
    'API_BASE_URL',
  ];

  let allValid = true;
  requiredVars.forEach(varName => {
    if (envContent.includes(varName)) {
      console.log(`✓ ${varName} is configured`);
    } else {
      console.warn(`✗ ${varName} is missing`);
      allValid = false;
    }
  });

  if (!allValid) {
    console.log('\nPlease configure all required environment variables in config/.env');
    process.exit(1);
  }

  console.log('\n✓ Environment check passed!');
}

checkEnv();

