/**
 * What mode the article is in.
 */
export enum ArticleMode {
  CREATE,
  /**Artcile should be in edit mode*/
  EDIT,
   /**Artcile should be in read only mode*/
  READ,
}

/**
 * Roles that a given user can be in.
 * 
*/
export enum UserRoles {
  /** Users that is only browsing and can not contribute in an way. */
  ANON = "Anonymous",
  /** Users can can only read published articles */
  READER = "Reader", 
  /** Users can read and create articles and edit their own articles */
  EDITOR = "Editor",
  /** Users that will have admin rights for maintainin the site as a whole */
  ADMIN = "Admin"
}