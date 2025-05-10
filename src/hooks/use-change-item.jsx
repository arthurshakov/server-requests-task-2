export const useChangeItem = (endpoint, setIsLoading, callback) => {
  return (id) => {
    const todoTitle = prompt('How would you like it to be named ?');

    if (todoTitle) {
      setIsLoading && setIsLoading(true);

      fetch(
        `${endpoint}/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify({ id, title: todoTitle })
        }
      )
        .then((rawJson) => rawJson.json())
        .then((changedItem) => {
            console.log('changedItem', changedItem);

            callback && callback();
        })
        .catch(error => {
          console.log(error);
          setIsLoading && setIsLoading(false);
        })
    }
  }
};
