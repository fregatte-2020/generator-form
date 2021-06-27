# **Начало работы**
## Подготовка HTML
```<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
  <!-- стили по умолчанию -->
  <link href="css/generator.style.css" rel="stylesheet">
  </head>
<body>
   <-- тег, для которого генерируется форма в соответствии с его id -->
   <template-form id=”main”></template-form>
   <!—скрипт генератора -->
   <script src=”js/generator.script.js”></script>
</body>
</html>

```

## Подготовка JS
По умолчанию форма генерируется для тега **```<template-form>```**, в котором указывается **id формы из json-файла (form.content.json)**, расположенного в **директории /template**.
**Селектор для генерации можно поменять.** Для этого в переменной **```$tempForm```** укажите Ваш селектор, ***например:***
```
var $tempForm = Array.from(document.querySelectorAll('form-box')).
```

Генератор принимает массив данных, поэтому **количество форм на одной странице не ограничено**.
**Директорию json-файла и его наименование также можно изменить.** Для этого в переменной **```$json```** меняем необходимые данные, ***например:***
```
var $json = './assets/form.json'.
```


Значения **action** и **method** можно задавать в json-файле, значения по умолчанию (если данные не прописаны в json) указаны в JavaScript. Для **замены их значений по умолчанию** необходимо изменить данные в переменных **```$formAction```** и **```$formMethod```**.

## Формирование JSON для генерации формы
Структура файла JSON может содержать от 3 до 6 уровней.
**1 уровень** содержит **id формы** для генерации, который указан в теге **```<template-form>```**.
**На 2 уровне** содержатся **параметры самой формы** (например, action, method, class) и **наименование 3 уровня** – **items (обязательный параметр)**.
**На 3 и последующих уровнях прописываются данные элементов формы.**

Структуру JSON можно представить следующим образом:
![Структура JSON](https://github.com/fregatte-2020/generator-form/blob/master/manual/structure_JSON.jpg)

Для данной структуры JSON будет иметь следующий вид:
```{
  "main": [
    {
      "action": "www.example.com",
      "class": "main-form",
      "items": [
        {
          "label": "Имя",
          "type": "input",
          "id": "name",
          "required": true
        },
        {
          "label": "Фамилия",
          "type": "text",
          "id": "last_name",
          "required": true,
          "item": [
            {
              "type": "text",
              "id": "last_name_previous"
            },
            {
              "type": "select",
              "id": "status",
              "option": [
                {
                  "text": "Не женат / не замужем",
                  "value": "1"
                },
                {
                  "text": "Женат / замужем",
                  "value": "2"
                }
              ]
            }
          ]
        },
        {
          "fieldset": true,
          "legend": "Дата рождения",
          "class": "row",
          "id": "birth",
          "item": [
            {
              "type": "number",
              "id": "day_birth",
              "min": 1,
              "max": 31,
              "required": true
            },
            {
              "type": "number",
              "id": "month_birth",
              "min": 1,
              "max": 12,
              "required": true
            },
            {
              "type": "number",
              "year": "date_birth",
              "min": 1940,
              "max": 2004,
              "required": true
            }
          ]
        },
        {
          "fieldset": true,
          "legend": "Образование",
          "class": "row",
          "item": [
            {
              "type": "select",
              "id": "education",
              "optgroup": [
                {
                  "label": "Высшее",
                  "option": [
                    {
                      "text": "Незаконченное высшее"
                    },
                    {
                      "text": "Полное высшее"
                    }
                  ]
                },
                {
                  "label": "Среднее",
                  "option": [
                    {
                      "text": "Среднее (11 классов)"
                    },
                    {
                      "text": "Средне-специальное"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

```

## Параметры элементов
<pre>
<table>
<tbody>
<tr>
<th>Блок</th>
<th>Пояснения</th>
<th>Обязательные параметры</th>
<th>Дополнительные параметры</th>
</tr>
<tr>
<td>form</td>
<td>Если не задан параметр <b>name</b>, то
присваивается значение <b>id</b> < template-form >.

Если не задан параметр <b>action</b>, то
значение берется из переменной <b>$formAction</b>.

Если не задан параметр <b>method</b>, то
значение берется из переменной <b>$formMethod</b>
(по умолчанию post).

Параметр <b>novalidate</b> принимает булевое
значение (true или false)</td>
<td>items</td>
<td>class
name
action
method
title (название в шапке формы)
charset (атрибут accept-charset)
autocomplete
enctype
target
novalidate</td>
</tr>
<tr>
<td>items</td>
<td>Должен быть указан только один
из обязательных параметров.</td>
<td>fieldset || type</td>
<td>Зависит от используемого
обязательного параметра.</td>
</tr>
<tr>
<td>fieldset</td>
<td>Принимает булевое значение: true или false.
Только со значением true проверяет наличие
других параметров блока.</td>
<td>item</td>
<td>class
name
legend
disabled
form</td>
</tr>
<tr>
<td>type</td>
<td>Может принимать следующие значения:
select, button, textarea, search,
file, image, url, color, hidden,
checkbox, radio, range, email,
date, datetime, datetime-local,
time, month, week, password,
text, number, reset, submit, tel

Параметры <b>name</b> и <b>id</b> взаимозаменяемы.
Если отстутсвует один из параметров, то его
значение берется из второго параметра.
Если оба параметра не заданы, то
атрибуты отсутствуют.
</td>
<td>Зависит от значения.</td>
<td>Зависит от значения.</td>
</tr>
<tr>
<td>type === select</td>
<td>Должен быть указан только один
из обязательных параметров.</td>
<td>optgroup || option</td>
<td>class
name
id
form
size
autofosus
disabled
required
multiple</td>
</tr>
<tr>
<td>optgroup</td>
<td></td>
<td>option
label</td>
<td>class
disabled</td>
</tr>
<tr>
<td>option</td>
<td>Параметры <b>value</b> и <b>text</b> взаимозаменяемы.
Если отстутсвует один из параметров, то его
значение берется из второго параметра.

Если не задан параметр <b>label</b>, то
значение берется из параметра <b>text</b>;
если не задан параметр <b>text</b>, то
значение берется из параметра <b>value</b>.</td>
<td>value || text</td>
<td>class
label
disabled
selected</td>
</tr>
<tr>
<td>type === button</td>
<td>Параметр <b>button</b> принимает значения
button, reset, submit.
Если параметр не задан, то
устанавливается значение button.

Параметры <b>name</b> и <b>id</b> взаимозаменяемы.
Если отстутсвует один из параметров, то его
значение берется из второго параметра.
Если оба параметра не заданы, то
атрибуты отсутствуют.</td>
<td></td>
<td>class
button
name
id
text
value
autofosus
disabled
form
onclick

При значении параметра button === submit
принимаются также параметры:
formaction
formenctype
formmethod
formnovalidate
formtarget</td>
</tr>
<tr>
<td>type === textarea</td>
<td>Параметры <b>name</b> и <b>id</b> взаимозаменяемы.
Если отстутсвует один из параметров, то его
значение берется из второго параметра.
Если оба параметра не заданы, то
атрибуты отсутствуют.</td>
<td></td>
<td>class
name
id
text
placeholder
form
dirname
cols
rows
wrap
minlength
maxlength
autoсomplete
autofosus
readonly
disabled
required</td>
</tr>
<tr>
<td>остальные type</td>
<td>При всех остальных значениях type
формируется input.
Дополнительные параметры для них
имеют как общий характер,
так и индивидуальный
(подробнее смотреть в спецификациях).

Параметры <b>name</b> и <b>id</b> взаимозаменяемы.
Если отстутсвует один из параметров, то его
значение берется из второго параметра.
Если оба параметра не заданы, то
атрибуты отсутствуют.</td>
<td></td>
<td>Общие параметры:
class
text
label
value
name
id
form
autocomplete
autofosus
disabled
readonly
required
onclick</td>
</tr>
<tr>
<td></td>
<td>type === file</td>
<td></td>
<td>accept
multiple</td>
</tr>
<tr>
<td></td>
<td>type === image</td>
<td>alt
src</td>
<td>width
height
formaction
formenctype
formmethod
formtarget</td>
</tr>
<tr>
<td></td>
<td>type === checkbox || radio</td>
<td></td>
<td>checked</td>
</tr>
<tr>
<td></td>
<td>type === tel</td>
<td></td>
<td>placeholder
maxlength
step
pattern
size</td>
</tr>
<tr>
<td></td>
<td>type === email</td>
<td></td>
<td>placeholder
maxlength
size
pattern
multiple</td>
</tr>
<tr>
<td></td>
<td>type === submit</td>
<td></td>
<td>formaction
formenctype
formmethod
formnovalidate</td>
</tr>
<tr>
<td></td>
<td>type === text || search ||
password || url</td>
<td></td>
<td>placeholder
maxlength
size
pattern</td>
</tr>
<tr>
<td></td>
<td>type === date || datetime || time ||
datetime-local || month || week ||
number || range</td>
<td></td>
<td>min
max
step</td>
</tr>
<tr>
</tr>
<tr>
</tr>
</tbody>
</table>
</pre>

## Данные на выходе
### fieldset
```
<fieldset class="{ class }" { attr }>
  <div class="{ classBox }">
    <legend class="{ class }">{ text }</legend>
    { elements }
  </div>
</fieldset>
```
### select
```
<select class="{ class }" { attr }">
  { optgroup || option }
</select>
```
### optgroup
```
<optgroup class="{ class }" { attr }>
  { option }
</optgroup>
```
### option
```
<option class="{ class }" { attr }>{ text }</option>
```
### button
```
<button class="{ class }" { attr }>{ text }</button>
```
### textarea
```
<textarea class="{ class }" { attr }>{ text }</textarea >
```
### input (кроме checkbox && radio)
```
<div class="{ itemsClass }">
  <div class="{ classBox }">
    { label }
    <input class="{ class }" { attr } />{ text }
  </div>
</div>
```
### input: checkbox && radio
Для возможности кастомизации label генерируется независимо от того, указан ли параметр в JSON.
```
<div class="{ itemsClass }">
  <div class="{ classBox }">
    <input class="{ class }" { attr } />{ text }
    { label }
  </div>
</div>
```
### label
```
<label class="{ class }" for="{ id }">{ text }</label>
```

Значения ```{ attr }``` формируются, исходя из принимаемых параметров **(см. Параметры элементов)**.
Значения ```{ class }``` формируются из значений по умолчанию, значений параметра ```class``` (если он имеется) и параметра ```type``` (только для input'ов).
Например:
- class="form__fieldset {название формы}__fieldset form__fieldset-{значение class} {название формы}__fieldset-{значение class}"
- class="form__textarea {название формы}__textarea form__textarea-{значение class} {название формы}__textarea-{значение class}"
- class="form__input {название формы}__input form__input-{значение type} {название формы}__input-{значение type} form__input-{значение class} {название формы}__input-{значение class}"

Значение ```{ classBox }``` для div'ов формируются следующим образом:
- для fieldset:
class="form__fieldsetbox {название формы}__fieldsetbox form__fieldsetbox-{значение class} {название формы}__fieldsetbox-{значение class}"
- для input'ов:
class="form__items {название формы}__items form__items-{значение class} {название формы}__items-{значение class} form____items-{значение type} {название формы}__items-{значение type}"

Если параметр ```class``` отсутствует, то и значение, к примеру, ```form__input-{значение class}``` отсутствует.

Пример сгенерированной формы доступен по [ссылке](http://bchd.hostronavt.ru/generator-form/)
