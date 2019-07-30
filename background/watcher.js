const chokidar = require('chokidar');

let watcher;

const watch = (path, callback) => {
   watcher && watcher.close()
   watcher = chokidar.watch(path, {
      ignoreInitial: true
   });
   watcher.on('all', callback)
};

export default watch;