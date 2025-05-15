// TodoCard.js
export function TodoCard(props) {
    const { todo, handleDeleteTodo, todoIndex, handleCompleteTodo, handleInitiateEdit } = props;

    return (
        <div className="card todo-item">
            <p className={todo.complete ? 'completed-todo' : ''}>{todo.input}</p>
            <div className="todo-buttons">
                <button
                    onClick={() => {
                        handleCompleteTodo(todoIndex);
                    }}
                    // Consider changing disabled logic or button text for completed items
                    // e.g. disabled={todo.complete} or text 'Undo'
                >
                    <h6>{todo.complete ? 'Undo' : 'Done'}</h6> 
                </button>
                <button
                    onClick={() => {
                        handleDeleteTodo(todoIndex);
                    }}
                >
                    <h6>Delete</h6>
                </button>
                {!todo.complete && ( // Only show Edit if not complete
                    <button
                        onClick={() => {
                            handleInitiateEdit(todoIndex, todo.input); 
                        }}
                    >
                        <h6>Edit</h6>
                    </button>
                )}
            </div>
        </div>
    );
}