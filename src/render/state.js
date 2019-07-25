function createState(initialState) {
   var state = JSON.parse(JSON.stringify(initialState));
   var listeners = {};

   function createRef(key, path = [key]) {
      function ref(key) {
         return createRef(key, path.concat(key));
      }
      function val() {
         var value = state;
         for (var i=1; i<path.length; i++) {
            var innerVal = value[path[i]]
            if (innerVal === undefined) return undefined
            value = innerVal;
         }
         return JSON.parse(JSON.stringify(value))
      }
      function set(value) {
         if (path.length === 1 && key === 'state') {
            state = value;
            callListeners();
            return;
         }
         var update = state;
         for (var i=1; i<path.length-1; i++) {
            update = update[path[i]];
         }
         if (update[key] === value) return;
         update[key] = value;
         callListeners();
      }
      function listen(listener) {
         var id = path.join('-');
         if (!listeners[id]) {
            listeners[id] = [];
         }
         listeners[id].push(listener);
         return function() {
            var index = listeners[id].indexOf(listener);
            listeners[id].splice(index, 1);
         }
      }
      function callListeners() {
         var pathKey = path.join('-');
         var keys = Object.keys(listeners);
         for (var i=0; i<keys.length; i++) {
            var hasPrefix = pathKey.startsWith(keys[i]);
            var isPrefix = keys[i].startsWith(pathKey);
            if (!hasPrefix && !isPrefix) continue;
            var id = keys[i];
            if (!listeners[id]) continue;
            for (var j=0; j<listeners[id].length; j++) {
               var refPath = id.split('-');
               var refKey = refPath[refPath.length - 1];
               var ref = createRef(refKey, refPath);
               listeners[id][j](ref);
            }
         }
      }
      return {
         ref: ref,
         val: val,
         set: set,
         listen: listen
      }
   };

   return createRef('state');
};

module.exports = createState;
