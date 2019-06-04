import Base from '../Base';
import list from './list';
import count from './count';

export default Base.setRouter([
  {
    path : '/list',
    router : list,
    method : 'get'
  },
  {
    path : '/count',
    router : count,
    method : 'get'
  }
])