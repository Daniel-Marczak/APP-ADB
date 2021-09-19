$(document).ready(function () {

    let locationsNames = [];
    const $searchBtn = '';

    $('.search-bar-form-submit-btn').click(function (event){
        event.preventDefault();
        if (validateLocationName() && validateStartAndEndDate() && validateNumberOfGuests()) {
            $('.search-form').submit();
        }
        if (!validateLocationName()) {
            $('.location-item-span-box').append(createLocationErrorSpan());
        } else {
            $('.location-error-span').remove();
        }
        if (!validateStartAndEndDate()) {
            $('.date-guest-selection-box').append(createDateErrorSpan());
        } else {
            $('.date-error-span').remove();
        }
        if (!validateNumberOfGuests()) {
            $('.date-guest-selection-box').append(createGuestErrorSpan());
        } else {
            $('.guest-error-span').remove();
        }
    });

    $.get('http://localhost:8080/api/reservation/available-locations-names', function (names) {
        locationsNames = names;
        $('.location-name-input')
            .on('keyup', function (event) {appendLocationItemSpan(event);})
            .on('keydown', function (event) {toggleLocationItemSpanFocus(event);})
            .on('keydown', function (event) {onKeydownAutofillLocationInput(event)});

        $('.event-start-input').val(setStartDateValue()).attr('min', getCurrentDate());
        $('.event-end-input').val(setEndDateValue()).attr('min', setEndDateMinVal());
    });

    $('.search-form').keydown(function (event){
        if (event.keyCode === 13){
            event.preventDefault();
        }
    });

    $(document).click(function (){
        $('.location-item-span').remove();
    }).keyup(function (event){
        if (event.keyCode === 9 || event.keyCode === 27){
            $('.location-item-span').remove();
        }
    });

    function appendLocationItemSpan(event) {
        const $locationItemSpanBox = $('.location-item-span-box');
        if (event.which !== 13 && event.which !== 37 && event.which !== 38 && event.which !== 39 && event.which !== 40) {
            const locationInputValue = $(event.target).val().toLowerCase();
            $locationItemSpanBox.find('.location-item-span').remove();
            $('.location-error-span').remove();

            $(locationsNames).each(function (index, name) {
                const nameMatchSubstr = name.substring(0, locationInputValue.length);
                const nameSuggestionSubstr = name.substring(locationInputValue.length);
                if (locationInputValue === nameMatchSubstr.toLowerCase() && locationInputValue.length > 0) {
                    const $itemSpan = $(`
                        <span class="location-item-span">
                            <input type="hidden" value="${name}" class="location-name">
                            <span class="match-span">${nameMatchSubstr}</span>
                            <span class="suggestion-span">${nameSuggestionSubstr}</span>
                        </span>
                `);
                    $itemSpan.click(onClickAutofillLocationInput);
                    $locationItemSpanBox.append($itemSpan);
                }
            });
        } else if (event.which === 13) {
            $locationItemSpanBox.find('.location-item-span').remove();
        }
    }

    function onClickAutofillLocationInput() {
        $('.location-name-input').val($(this).find('input.location-name').val());
        $('.location-item-span').each(function (index, itemSpan) {
            $(itemSpan).addClass('hidden');
        });
    }

    function onKeydownAutofillLocationInput(event){
        if (event.keyCode === 13) {
            $('.location-item-span').each(function (index, itemSpan) {
                if ($(itemSpan).hasClass('item-focus')){
                    $('.location-name-input').val($(itemSpan).find('input.location-name').val());
                }
            });
        }
    }

    function toggleLocationItemSpanFocus(event) {
        const $locationItemSpans = $('.location-item-span');
        const hasFocus = $locationItemSpans.hasClass('item-focus');

        $locationItemSpans.each(function (index, itemSpan) {
            const isItemFocus = $(itemSpan).hasClass('item-focus');
            if (event.which === 38 && isItemFocus) {
                $(itemSpan).removeClass('item-focus');
                $locationItemSpans.eq(index - 1).addClass('item-focus');
                return false;
            } else if (event.which === 40 && isItemFocus) {
                $(itemSpan).removeClass('item-focus');
                if (index === $locationItemSpans.length - 1){
                    $locationItemSpans.eq(0).addClass('item-focus');
                }
                $locationItemSpans.eq(index + 1).addClass('item-focus');
                return false;
            }
        });
        if (event.which === 38 && !hasFocus || event.which === 40 && !hasFocus) {
            $locationItemSpans.eq(0).addClass('item-focus');
        }
    }

    function validateLocationName(){
        const $locationNameInputVal = $('.location-name-input').val();
        let isNameValid = false;
        $(locationsNames).each(function (index, name) {
            if ($locationNameInputVal === name){
                isNameValid = true;
            }
        });
        return isNameValid;
    }

    function getCurrentDate(){
        const currentDate = new Date();
        return currentDate.getFullYear() + '-' + String(currentDate.getMonth() + 1).padStart(2, '0') + '-' + String(currentDate.getDate()).padStart(2, '0');
    }

    function setStartDateValue(){
        const currentDate = new Date();
        const eventStartInput  =$('.event-start-input').val();
        currentDate.setDate(currentDate.getDate() + 1);
        if (!eventStartInput) {
            return getCurrentDate();
        } else {
            return eventStartInput;
        }
    }

    function setEndDateValue(){
        const currentDate = new Date();
        const eventEndInput = $('.event-end-input').val();
        currentDate.setDate(currentDate.getDate() + 1);
        if (!eventEndInput) {
            return currentDate.getFullYear() + '-' + String(currentDate.getMonth() + 1).padStart(2, '0') + '-' + String(currentDate.getDate()).padStart(2, '0');
        } else {
            return eventEndInput;
        }
    }

    function setEndDateMinVal(){
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        return currentDate.getFullYear() + '-' + String(currentDate.getMonth() + 1).padStart(2, '0') + '-' + String(currentDate.getDate()).padStart(2, '0');
    }

    function validateStartAndEndDate(){
        const currentDate = new Date(getCurrentDate());
        const eventStart = new Date($('.event-start-input').val());
        const eventEnd = new Date($('.event-end-input').val());
        const timeDifference = eventEnd.getTime() - eventStart.getTime();
        $('.days-input').val(timeDifference / 86400000);
        $('.search-event-start').val(eventStart.getFullYear() + '-' + String(eventStart.getMonth() + 1).padStart(2, '0') + '-' + String(eventStart.getDate()).padStart(2, '0'));
        $('.search-event-end').val(eventEnd.getFullYear() + '-' + String(eventEnd.getMonth() + 1).padStart(2, '0') + '-' + String(eventEnd.getDate()).padStart(2, '0'));
        return eventStart.getTime() >= currentDate.getTime() && eventStart.getTime() < eventEnd.getTime();
    }

    function validateNumberOfGuests(){
        return $('.guests-input').val() > 0;
    }

    function createLocationErrorSpan(){
        $('.location-error-span').remove();
        return $(`
            <span class="text-error location-error-span">
                This location is not available.
            </span>
        `);
    }

    function createDateErrorSpan(){
        $('.date-error-span').remove();
        return $(`
            <span class="text-error date-error-span">
                The difference between selected dates<br>
                cannot be smaller than one day.<br>
            </span>
        `);
    }

    function createGuestErrorSpan(){
        $('.guest-error-span').remove();
        return $(`
            <span class="text-error guest-error-span">
                Required.
            </span>
        `);
    }

});
