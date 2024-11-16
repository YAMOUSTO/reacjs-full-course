export function TodoCard(props) {
    const {todo, handleDeleteTodo, todoIndex, handleCompleteTodo, handleEditData } = props

    return (
        <div className="car todo-item">
            <p>{todo.input}</p>
            <div className="todo-buttons">
                <button onClick={() =>{
                    handleCompleteTodo(todoIndex)
                }} disabled={todo.complete}>
                    <h6>Done</h6>
                </button>
                <button onClick={() => {
                    handleDeleteTodo(todoIndex)
                }}>
                    <h6>Delete</h6>
                </button>
                <button onClick={() => {
                   const newInput = prompt("Enter the updated todo:", todo.input);
                   if (newInput !== null && newInput.trim() !== "") {
                    handleEditData(todoIndex, newInput); // Pass updated input to handleEditData
                }
                }}>
                    <h6>Edit</h6>
                </button>
            </div>
        </div>
    )
}