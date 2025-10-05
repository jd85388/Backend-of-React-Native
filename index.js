import('./dist/index.js').catch(err => {
    console.error('Error loading app:', err);
    process.exit(1);
});