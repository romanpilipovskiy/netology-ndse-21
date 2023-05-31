#### Запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**,
```
db.books.insertMany([
    {
        title: "Букварь",
        description: "Первая книга",
        authors: "Иванов И.И."
    },
    {
        title: "Энциклопедия",
        description: "Справочная книга",
        authors: "Петров П.П."
    },
]);
```

#### Запрос для *поиска* полей документов коллекции **books** по полю *title*,
```
db.books.find(
    { title: "Букварь" },
    { description: 1, authors: 1 }
);
```

#### Запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи.
```
db.collection.updateOne(
   { _id: "1" },
   { $set: { description: "Новое описание", authors: "Сидоров С.С." }},
   ...
);
```