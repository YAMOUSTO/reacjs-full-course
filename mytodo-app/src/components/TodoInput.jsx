export function TodoInput({ onFormSubmit, inputValue, setInputValue, isEditing, onCancelEdit }) {
    return (
        <div className="input-container">
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add task"
            />

            <button
                onClick={() => {
                    if (!inputValue.trim()) return;
                    onFormSubmit(inputValue);
                }}
            >
                {isEditing ? <i className="fa-solid fa-pen-to-square"></i> : <i className="fa-solid fa-plus"></i>}
            </button>

            {isEditing && (
                <button onClick={onCancelEdit}>
                    Cancel
                </button>
            )}
        </div>
    );
}
