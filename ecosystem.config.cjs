module.exports = {
  apps: [
    {
      name: 'mtn-fibre-prime',
      script: 'npx',
      args: 'serve out -p 3000 -s',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
    },
  ],
};
