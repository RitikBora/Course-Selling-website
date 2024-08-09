module.exports = {
    apps: [
      {
        name: 'Admin App',
        exec_mode: 'cluster',
        instances: 1, // Or a number of instances
        script: '../../node_modules/next/dist/bin/next',
        args: 'start -p 3000',
      }
    ]
  }