import { fromEvent, interval } from 'rxjs';
import { scan, mapTo } from 'rxjs/operators';

/**
 * @description: 事件监听函数
 * @param {type} 
 * @return: 
 */
// var button = document.querySelector('button');

// button?.addEventListener('click', () => {
//   console.log('Clicked!')
// })

// fromEvent(button as HTMLButtonElement, 'click').subscribe(() => {
//   console.log('clicked!!!')
// })

/**
 * @description: 计数器
 * @param {type} 
 * @return: 
 */

var button = document.querySelector('button');
// var count = 0;
// button?.addEventListener('click', ()=> {
//   console.log(`clicked ${++count} times`);
// })

const clicks = fromEvent(button as HTMLButtonElement, 'click');
const ones = clicks.pipe(mapTo(3));
const seed = 0;
const count = ones.pipe(scan((acc, one) => {
  console.log('--------------------------')
  console.log('acc', acc);
  console.log('one', one);
  console.log('--------------------------')
  return acc + one
}, seed));
count.subscribe(x => console.log(x, count));