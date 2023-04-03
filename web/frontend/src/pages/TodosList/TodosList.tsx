import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { selectTodos } from './selectors';
import { todosActions } from './todoSlice';

export const TodosList = () => {
  const dispatch = useAppDispatch();
  const [formValue, setFormValue] = useState('');
  const [idEditing, setIdEditing] = useState<string | undefined>(undefined);
  const { statusRequest, statusCreating, queueUpdating, queueDeleting, todos } = useAppSelector(selectTodos);

  useEffect(() => {
    if (statusRequest === 'idle') {
      dispatch(todosActions.getTodosRequest({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (statusRequest === 'request') {
    return <h1>Fetching data...</h1>;
  }

  return (
    <div className="App">
      <div>
        <input value={formValue} onChange={e => setFormValue(e.target.value)} />
        <button
          onClick={() => {
            if (idEditing) {
              dispatch(
                todosActions.updateTodoRequest({
                  id: idEditing,
                  data: {
                    title: formValue,
                    description: formValue,
                  },
                }),
              );
            } else {
              dispatch(
                todosActions.createTodoRequest({
                  data: {
                    title: formValue,
                    description: formValue,
                  },
                }),
              );
            }
          }}
        >
          {idEditing
            ? queueUpdating.includes(idEditing)
              ? 'Saving'
              : 'Save'
            : statusCreating === 'loading'
            ? 'Adding'
            : 'Add'}
        </button>
      </div>
      <ul>
        {todos.map(({ id, title, description }) => {
          return (
            <li style={{ display: 'flex', alignItems: 'center' }} key={id}>
              <div>
                <p>{title}</p>
                <sub>{description}</sub>
              </div>
              <div style={{ marginLeft: 20 }}>
                <button
                  onClick={() => {
                    setIdEditing(id);
                    setFormValue(title);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    dispatch(todosActions.deleteTodoRequest({ id }));
                  }}
                >
                  {queueDeleting.includes(id) ? 'Deleting' : 'Delete'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
