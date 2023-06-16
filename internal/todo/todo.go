package todo

type Item struct {
	Id      int    `json:"id"`
	Content string `json:"content"`
	Done    bool   `json:"done"`
}

type Deletion struct {
	Ids []int `json:"ids"`
}

type List []Item

func (l *List) AddOrUpdateTodo(item Item) {
	if !l.UpdateTodo(item) {
		*l = append(*l, item)
	}
}

func (l *List) UpdateTodo(updated Item) bool {
	for i, item := range *l {
		if item.Id == updated.Id {
			[]Item(*l)[i] = updated
			return true
		}
	}
	return false
}

func (l *List) DeleteTodos(deletion Deletion) {
	var newList List

	for _, item := range *l {
		if !deletion.Contains(item) {
			newList = append(newList, item)
		}
	}
	*l = newList
}

func (d Deletion) Contains(item Item) bool {
	for _, id := range d.Ids {
		if item.Id == id {
			return true
		}
	}
	return false
}
