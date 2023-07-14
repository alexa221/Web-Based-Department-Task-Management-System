function GoalItem({title, children}) {
    return (
      <li>
        <article>
          <h2>{title}</h2>
          <h1>
            {children}
          </h1>
        </article>
      </li>
    );
  }
  
  export default GoalItem;