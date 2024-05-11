export type THttpMethods = 'get' | 'delete' | 'head' | 'options'
export type THttpMethodsWithBody = Omit<THttpMethods, 'get'>

export type TOrderBy =
  | 'none'
  | 'ID'
  | 'author'
  | 'title'
  | 'name'
  | 'type'
  | 'date'
  | 'modified'
  | 'parent'
  | 'rand'
  | 'comment_count'
  | 'relevance'
  | 'menu_order'
  | 'meta_value'
  | 'meta_value_num'
  | 'post__in'
  | 'post_name__in'
  | 'post_parent__in'

export type TOrder = 'ASC' | 'DESC'
