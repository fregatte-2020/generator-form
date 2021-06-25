window.addEventListener('DOMContentLoaded', function() {
  // init
  generatorForms();


  function generatorForms() {
    var $tempForm = Array.from(document.querySelectorAll('template-form')).map(tempId => {
      return tempId.getAttribute('id');
    });

    $tempForm.forEach(function($tempId) {
      var $json = './template/form.content.json',
      $request = new XMLHttpRequest();
      $request.open('GET', $json);

      $request.onload = function(e) {
       if ($request.readyState === 4) {
        if ($request.status === 200) {
          var $obj = JSON.parse($request.responseText);
          genForm($obj);
        }
      }
    };

    $request.send();

    function genForm(data) {
        // основные переменные
        var $dataForm = data[$tempId][0],
        $firstLevel = $dataForm.items,
        $formAction = $dataForm.action ? $dataForm.action : 'www.example.com',
        $formMethod = $dataForm.method ? $dataForm.method : 'post',
        $formClass = $dataForm.class ? $dataForm.class : 'form',
        $formTitle = $dataForm.title ? `<div class="form__title ${ $formClass }__title">${ $dataForm.title }</div>` : '',
        $formName = $dataForm.name ? `name="${ $dataForm.name }"` : `name="${ $tempId }"`,
        $formCharset = $dataForm.charset ? `accept-charset="${ $dataForm.charset }"` : '',
        $formAutocomplecte = $dataForm.autocomplete ? `autocomplete="${ $dataForm.autocomplete }"` : '',
        $formEnctype = $dataForm.enctype ? `enctype="${ $dataForm.enctype }"` : '',
        $formNovalid = '',
        $formTarget = $dataForm.target ? `target="${ $dataForm.name }"` : '',
        $formAttr = $formName + $formCharset + $formAutocomplecte + $formEnctype + $formNovalid,
        $class = '',
        $fieldset = '',
        $fieldsetClass = '',
        $legend = '',
        $legendClass = '',
        $select = '',
        $selectClass = '',
        $optgroup = '',
        $optgroupClass = '',
        $option = '',
        $optionClass = '',
        $optClass = '',
        $button = '',
        $buttonClass = '',
        $textareaClass = '',
        $inputClass = '',
        $label = '',
        $labelClass = '',
        $items = '',
        $itemsClass = '',
        $item = '',
        $group = '';

        // проверка необходимости валидации формы
        if ($dataForm.hasOwnProperty('novalidate') && $dataForm.novalidate === true) {
          $formNovalid = 'novalidate';
        }


        var blockForm = $firstLevel.map(el => {
          // создание select'a
          function selectForms(element) {
            $selectClass = element.class ? `form__select ${ $formClass }__select form__select-${ element.class } ${ $formClass }__select-${ element.class }` : `form__select ${ $formClass }__select`;

            // атрибуты
            var autofosus = element.autofosus ? 'autofosus' : '',
            disabled = element.disabled ? 'disabled' : '',
            required = element.required ? 'required' : '',
            multiple = element.multiple ? 'multiple' : '',
            form = element.form ? `form="${ element.form }"` : '',
            name = element.name ? `name="${ element.name }"` : (element.id ? `name="${ element.id }"` : ''),
            id = element.name ? `id="${ element.id }"` : (element.name ? `id="${ element.name }"` : ''),
            size = element.size ? `size="${ element.size }"` : '',
            $selectAttr = `${ form } ${ name } ${ id } ${ size } ${ multiple } ${ autofosus } ${ disabled } ${ required }`;

            // создание option || optgroup
            if (element.hasOwnProperty('optgroup')) {
              var optgroups = element.optgroup.map(optgroup => {
                $optgroupClass = element.class ? `form__optgroup ${ $formClass }__optgroup form__optgroup-${ element.class } ${ $formClass }__optgroup-${ element.class }` : `form__optgroup ${ $formClass }__optgroup`;
                var disabled = element.disabled ? 'disabled' : '';

                var opt = optgroup.option.map(opt => {
                  $optClass = element.class ? `form__option ${ $formClass }__option form__option-${ element.class } ${ $formClass }__option-${ element.class }` : `form__option ${ $formClass }__option`;

                  // атрибуты
                  var value = opt.value ? `value="${ opt.value }"` : `value="${ opt.text }"`,
                  text = opt.text ? `value="${ opt.text }"` : `value="${ opt.value }"`,
                  label = opt.label ? `value="${ opt.label }"` : (opt.text ? `value="${ opt.text }"` : `value="${ opt.value }"`),
                  disabled = element.disabled ? 'disabled' : '',
                  selected = element.selected ? 'selected' : '',
                  $optionAttr = `${ value } ${ label } ${ disabled } ${ selected }`;

                  $opt = `<option class="${ $optClass }" ${ $optionAttr }>${ opt.text }</option>`;
                  return $opt;
                });

                $optgroup = `<optgroup class="${ $optgroupClass }" label="${ optgroup.label }" ${ disabled }>
                ${ opt.join('') }
                </optgroup>`;
                return $optgroup;
              });

              $options = optgroups.join('');
            } else {
              var option = element.option.map(option => {
                $optionClass = element.class ? `form__option ${ $formClass }__option form__option-${ element.class } ${ $formClass }__option-${ element.class }` : `form__option ${ $formClass }__option`;

                // атрибуты
                var value = option.value ? `value="${ option.value }"` : `value="${ option.text }`,
                text = option.text ? `value="${ option.text }"` : `value="${ option.value }"`,
                label = option.label ? `value="${ option.label }"` : (option.text ? `value="${ option.text }"` : (option.value ? `value="${ option.value }"` : '')),
                disabled = element.disabled ? 'disabled' : '',
                selected = element.selected ? 'selected' : '',
                $optionAttr = `${ value } ${ label } ${ disabled } ${ selected }`;

                $options = `<option class="${ $optionClass }" ${ $optionAttr }>${ option.text }</option>`;

                return $options;
              })

              $options = option.join('');
            };

            $items = `<select class="${ $selectClass }" ${ $selectAttr }">
            ${ $options }
            </select>`;
          };
          // end select


          // создание button'a
          function buttonForms(element) {
            $buttonClass = element.class ? `form__button ${ $formClass }__button form__button-${ element.class } ${ $formClass }__button-${ element.class }` : `form__button ${ $formClass }__button`;

            // атрибуты
            var autofosus = element.autofosus ? 'autofosus' : '',
            disabled = element.disabled ? 'disabled' : '',
            name = element.name ? `name="${ element.name }"`: (element.id ? `name="${ element.id}"` : ''),
            id = element.id ? `id="${ element.id }"`: (element.name ? `id="${ element.name }"` : ''),
            form = element.form ? `type="${ element.form }"` : '',
            type = element.button ? `type="${ element.button }"` : `type="button"`,
            value = element.value ? `type="${ element.value }"` : '',
            onclick = element.onclick ? `onclick="${ element.onclick }"` : '',
            $buttonAttr = `${ form } ${ type } ${ name } ${ id } ${ value } ${ autofosus } ${ disabled } ${ onclick }`;

            if (element.button === 'submit') {
             var formaction = element.formaction ? `formaction="${ element.formaction }"` : '',
             formenctype = element.formenctype ? `formenctype="${ element.formenctype }"` : '',
             formmethod = element.formmethod ? `formmethod="${ element.formmethod }"` : '',
             formnovalidate = element.formnovalidate ? `formnovalidate` : '',
             formtarget = element.formtarget ? `formtarget="${ element.formtarget }"` : '',
             $buttonFormAttr = `${ formaction } ${ formenctype } ${ formmethod } ${ formtarget } ${ formnovalidate }`;

             $items = `<button class="${ $buttonClass }" ${ $buttonAttr } ${ $buttonFormAttr }>${ element.text ? element.text : ''}</button>`;
           } else {
             $items = `<button class="${ $buttonClass }" ${ $buttonAttr }>${ element.text ? element.text : ''}</button>`;
           }
         };
          // end button


          // создание textarea'a
          function textareaForms(element) {
            $textareaClass = element.class ? `form__textarea ${ $formClass }__textarea ${ $formClass }__textarea-${ element.class }` : `form__textarea ${ $formClass }__textarea`;

            // атрибуты
            var autofosus = element.autofosus ? 'autofosus' : '',
            readonly = element.readonly ? 'readonly' : '',
            disabled = element.disabled ? 'disabled' : '',
            required = element.required ? 'required' : '',
            autoсomplete = element.autoсomplete ? `autoсomplete="${ element.autoсomplete }"` : '',
            name = element.name ? `name="${ element.name }"` : (element.id ? `name="${ element.id }"` : ''),
            id = element.id ? `name="${ element.id }"` : (element.name ? `name="${ element.name }"` : ''),
            form = element.form ? `form="${ element.autoсomplete }"` : '',
            dirname = element.dirname ? `dirname="${ element.autoсomplete }"` : '',
            placeholder = element.placeholder ? `placeholder="${ element.placeholder }"` : '',
            cols = element.cols ? `cols="${ element.cols }"` : '',
            rows = element.rows ? `rows="${ element.rows }"` : '',
            wrap = element.wrap ? `wrap="${ element.wrap }"` : '',
            minlength = element.minlength ? `minlength="${ element.minlength }"` : '',
            maxlength = element.maxlength ? `maxlength="${ element.maxlength }"` : '',
            $textareaAttr = `${ name } ${ id } ${ form } ${ dirname } ${ placeholder } ${ cols } ${ rows } ${ wrap } ${ minlength } ${ maxlength } ${ autoсomplete } ${ autofosus } ${ readonly } ${ disabled } ${ required }`;

            $items = `<textarea class="${ $textareaClass }" ${ $textareaAttr }>${ element.text ? element.text : '' }</textarea>`;
          };
          // end textarea


          // создание input'a
          function inputForms(element) {
            if (element.type === 'select') {
              selectForms(element);
            } else if (element.type === 'button') {
              buttonForms(element);
            } else if (element.type === 'textarea') {
              textareaForms(element);
            } else {
              $itemsClass = element.class ? `form__items ${ $formClass }__items form__items-${ element.class } ${ $formClass }__items-${ element.class }form__items-${ element.type } ${ $formClass }__items-${ element.type }` : `form__items ${ $formClass }__items form__items-${ element.type } ${ $formClass }__items-${ element.type }`;
              $labelClass = element.class ? `form__label ${ $formClass }__label ${ $formClass }__label-${ element.class } form__label-${ element.type } ${ $formClass }__label-${ element.type }` : `form__label ${ $formClass }__label form__label-${ element.type } ${ $formClass }__label-${ element.type }`;
              $inputClass = element.class ? `form__input ${ $formClass }__input form__input-${ element.type } ${ $formClass }__input-${ element.class } ${ $formClass }__input-${ element.type }` : `form__input form__input-${ element.type } ${ $formClass }__input ${ $formClass }__input-${ element.type }`;
              var $label = element.label ? `<label class="${ $labelClass }" ${ labelId }>${ element.label }</label>` : '';

              // атрибуты
              var autofosus = element.autofosus ? 'autofosus' : '',
              disabled = element.disabled ? 'disabled' : '',
              required = element.required ? 'required' : '',
              checked = element.checked ? 'checked' : '',
              readonly = element.readonly ? 'readonly' : '',
              multiple = element.multiple ? 'multiple' : '',
              autocomplete = element.autocomplete ? `autocomplete="${ element.autocomplete }"` : '',
              form = element.form ? `form="${ element.form }"` : '',

              formaction = element.formaction ? `formaction="${ element.formaction }"` : '',
              formenctype = element.formenctype ? `formenctype="${ element.formenctype }"` : '',
              formmethod = element.formmethod ? `formmethod="${ element.formmethod }"` : '',
              formtarget = element.formtarget ? `formtarget="${ element.formtarget }"` : '',
              formnovalidate = element.formnovalidate ? `formnovalidate="${ element.formnovalidate }"` : '',
              accept = element.accept ? `accept="${ element.accept }"` : '',
              name = element.name ? `name="${ element.name }"` : (element.id ? `name="${ element.id }"` : ''),
              id = element.id ? `id="${ element.id }"` : (element.name ? `id="${ element.name }"` : ''),
              labelId = element.id ? `for="${ element.id }"` : (element.name ? `for="${ element.name }"` : ''),
              alt = element.alt ? `alt="${ element.alt }"` : '',
              src = element.src ? `src="${ element.src }"` : '',
              width = element.width ? `width="${ element.width }"` : '',
              height = element.height ? `height="${ element.height }"` : '',
              min = element.min ? `min="${ element.min }"` : '',
              max = element.max ? `max="${ element.max }"` : '',
              maxlength = element.maxlength ? `maxlength="${ element.maxlength }"` : '',
              step = element.step ? `step="${ element.step }"` : '',
              size = element.size ? `size="${ element.size }"` : '',
              pattern = element.pattern ? `pattern="${ element.pattern }"` : '',
              value = element.value ? `value="${ element.value }"` : '',
              placeholder = element.placeholder ? `placeholder="${ element.placeholder }"` : '',
              onclick = element.onclick ? `onclick="${ element.onclick }"` : '',
              $inputAttrAll = `${ id } ${ name } ${ form } ${ value } ${ autocomplete } ${ autofosus } ${ disabled } ${ readonly } ${ required } ${ onclick }`,
              $inputAttr = '';

              if (element.type === 'file') {
                $inputAttr = `${ $inputAttrAll } ${ accept } ${ multiple }`;
              } else if (element.type === 'image') {
                $inputAttr = `${ $inputAttrAll } ${ alt } ${ src } ${ formaction } ${ formenctype } ${ formmethod } ${ formtarget } ${ width } ${ height }`;
              } else if (element.type === 'checkbox' || element.type === 'radio') {
                $inputAttr = `${ $inputAttrAll } ${ checked }`;
              } else if (element.type === 'tel') {
                $inputAttr = `${ $inputAttrAll } ${ maxlength } ${ step } ${ size } ${ pattern } ${ placeholder }`;
              } else if (element.type === 'email') {
                $inputAttr = `${ $inputAttrAll } ${ maxlength } ${ size } ${ pattern } ${ placeholder } ${ multiple }`;
              } else if (element.type === 'submit') {
                $inputAttr = `${ $inputAttrAll } ${ formaction } ${ formenctype } ${ formmethod } ${ formnovalidate }`;
              } else if (element.type === 'text' || element.type === 'search' || element.type === 'password' || element.type === 'url') {
                $inputAttr = `${ $inputAttrAll } ${ maxlength } ${ size } ${ pattern } ${ placeholder }`;
              } else if (element.type === 'date' || element.type === 'datetime' || element.type === 'time' || element.type === 'datetime-local' || element.type === 'month' || element.type === 'week' || element.type === 'number' || element.type === 'range') {
                $inputAttr = `${ $inputAttrAll } ${ min } ${ max } ${ step }`;
              } else {
                $inputAttr = $inputAttrAll;
              }

              $input = `<input class="${ $inputClass }" type="${ element.type }" ${ $inputAttr } />${ element.text ? element.text : '' }`;


              if (element.type === 'checkbox' || element.type === 'radio') {
                $group = `<div class="${ $itemsClass }">
                ${ $input }
                <label class="${ $labelClass }" ${ labelId }>${ element.label ? element.label : '' }</label>
                </div>`;
              } else {
                $group = `<div class="${ $itemsClass }">
                  ${ $label }
                  ${ $input }
                  </div>`;
              }
            }
          };
          // end input


          // создание блока подуровня item => item с запуском вышеперечисленных функций
          function itemsForm(el) {
             $labelClass = el.class ? `form__label ${ $formClass }__label ${ $formClass }__label-${ el.class } form__label-${ el.type } ${ $formClass }__label-${ el.type }` : `form__label ${ $formClass }__label form__label-${ el.type } ${ $formClass }__label-${ el.type }`;
            $label = el.label ? `<label class="${ $labelClass }" for="${ el.id } ">${ el.label }</label>` : '';

            inputForms(el);

            var $inputGroup = $group;

            var itemForms = el.item.map(item => {
              if (item.hasOwnProperty('fieldset') && item.fieldset === true) {
                $itemsClass = item.class ? `form__items ${ $formClass }__items form__items-${ item.class } ${ $formClass }__items-${ item.class } form____items-${ item.type } ${ $formClass }__items-${ item.type }` : `form__items ${ $formClass }__items form____items-${ item.type } ${ $formClass }__items-${ item.type }`;
                $inputClass = item.class ? `form__input ${ $formClass }__input form__${ item.type } ${ $formClass }__input-${ element.class } ${ $formClass }__input-${ item.type }` : `form__input ${ $formClass }__${ item.type } ${ $formClass }__input ${ $formClass }__input-${ item.type }`;

                $item = `<div class="${ $itemsClass }">
                ${$label}
                <div class="form__elem ${ $formClass }__elem">
                <input class="${ $inputClass }" type="${ el.type }" name="${el.id}" id="${el.id}" />${ el.text ? el.text : '' }
                ${ fieldsetForms(item) }
                </div>
                </div>`;
              } else {
               if (item.type === 'select') {
                selectForms(item);
                $item = $items;
              } else if (item.type === 'button') {
                buttonForms(item);
                $item = $items;
              } else if (item.type === 'textarea') {
                textareaForms(item);
                $item = $items;
              } else {
                inputForms(item);
                $item = $group;
              }
              return $item;
            }

          });

            $group = `${ $inputGroup }
            ${ itemForms.join('') }
            `;
          };
          // end item => item


          // создание fieldset
          function fieldsetForms(element) {
            $fieldsetClass = element.class ? `form__fieldset ${ $formClass }__fieldset form__fieldset-${ element.class } ${ $formClass }__fieldset-${ element.class }` : `form__fieldset ${ $formClass }__fieldset`;
            $fieldsetBoxClass = element.class ? `form__fieldsetbox ${ $formClass }__fieldsetbox form__fieldsetbox-${ element.class } ${ $formClass }__fieldsetbox-${ element.class }` : `form__fieldsetbox ${ $formClass }__fieldsetbox`;
            $legendClass = element.class ? `form__legend ${ $formClass }__legend form__legend-${ element.class } ${ $formClass }__legend-${ element.class }` : `form__legend ${ $formClass }__legend`;
            $legend = element.legend ? `<legend class="${ $legendClass }">${ element.legend }</legend>` : '';

            var disabled = element.disabled ? 'disaled' : '',
            form = element.form ? `form="${ element.form }"` : '',
            name = element.name ? `name="${ element.name }"` : '',
            $fieldsetAttr = `${ name } ${ form } ${ disabled }`;

            var itemsForm = element.item.map(e => {
              if (e.type === 'select') {
                selectForms(e);
              } else if (e.type === 'button') {
                buttonForms(e);
              } else if (e.type === 'textarea') {
                textareaForms(e);
              } else {
                inputForms(e);
                $items = $group;
              }

              return $items;
            })

            // объединение всех созданных элементов формы
            $group =  `<fieldset class="${ $fieldsetClass }" ${ $fieldsetAttr }>
            <div class="${ $fieldsetBoxClass }">
            ${ $legend }
            ${ itemsForm.join('') }
            </div>
            </fieldset>`;
          };
          // end fieldset


          if (el.hasOwnProperty('fieldset') && el.fieldset === true) {
            fieldsetForms(el);
          } else {
            if (el.hasOwnProperty('item') && el.hasOwnProperty('type')) {
              itemsForm(el);
            } else {
              if (el.type === 'select') {
                selectForms(el);
                $group = $items;
              } else if (el.type === 'button') {
                buttonForms(el);
                $group = $items;
              } else if (el.type === 'textarea') {
                textareaForms(el);
                $group = $items;
              } else {
                inputForms(el);
              }
            }
          }

          return $group;
        });

        // создание формы
        document.getElementById($tempId).insertAdjacentHTML('afterbegin',
          `<form class="form ${ $formClass }" action="${ $formAction }" method="${ $formMethod }" ${ $formAttr }>
          <div class="form__box ${ $formClass }__box">
          ${ $formTitle }
          ${ blockForm.join('') }
          </div>
          </form>`
          );

      };

    });
  };

});
