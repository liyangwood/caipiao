import Base from '../Base';
import list from './list';
import count from './count';

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
  }
])