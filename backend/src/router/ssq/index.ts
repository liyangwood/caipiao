import Base from '../Base';
import list from './list';
import count from './count';
import number_rate from './number_rate';

export default Base.setRouter([
  {
    path : '/list',
    router : list,
    method : 'all'
  },
  {
    path : '/count',
    router : count,
    method : 'get'
  },
  {
    path : '/number_rate',
    router : number_rate,
    method : 'get'
  }
])