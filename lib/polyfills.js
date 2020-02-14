/* eslint no-extend-native: 0 */
// core-js comes with Next.js. So, you can import it like below
import includes from 'core-js/features/string/virtual/includes'
import repeat from 'core-js/features/string/virtual/repeat'
import assign from 'core-js/features/object/assign'
import 'core-js/features/map'
import 'core-js/features/set'
// Add your polyfills
// This files runs at the very beginning (even before React and Next.js core)
console.log('Load your polyfills')

String.prototype.includes = includes
String.prototype.repeat = repeat
Object.assign = assign
