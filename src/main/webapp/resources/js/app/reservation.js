$(document).ready(function () {

    let locationsNames = [];

    $.get('http://localhost:8080/api/reservation/available-locations-names', function (names) {
        locationsNames = names;
        $('.location-input')
            .on('keyup', function (event) {appendLocationItemSpan(event);})
            .on('keydown', function (event) {toggleLocationItemSpanFocus(event);})
            .on('keydown', function (event) {onKeydownAutofillLocationInput(event)});
    });

    $('.reservation-form').keydown(function (event){
        if (event.keyCode === 13){
            event.preventDefault();
        }
    })

    function appendLocationItemSpan(event) {
        const locationItemSpanBox = $('.location-item-span-box');
        if (event.which !== 13 && event.which !== 37 && event.which !== 38 && event.which !== 39 && event.which !== 40) {
            const locationInputValue = $(event.target).val().toLowerCase();
            locationItemSpanBox.find('.location-item-span').remove();

            $(locationsNames).each(function (index, name) {
                const nameMatchSubstr = name.substring(0, locationInputValue.length);
                const nameSuggestionSubstr = name.substring(locationInputValue.length);
                if (locationInputValue === nameMatchSubstr.toLowerCase() && locationInputValue.length > 0) {
                    const itemSpan = $(`
                        <span class="location-item-span">
                            <input type="hidden" value="${name}" class="location-name">
                            <span class="match-span">${nameMatchSubstr}</span>
                            <span class="suggestion-span">${nameSuggestionSubstr}</span>
                        </span>
                `);
                    itemSpan.click(onClickAutofillLocationInput);
                    locationItemSpanBox.append(itemSpan);
                }
            });
        } else if (event.which === 13) {
            locationItemSpanBox.find('.location-item-span').remove();
        }
    }

    function onClickAutofillLocationInput() {
        $('.location-input').val($(this).find('input.location-name').val());
        $('.location-item-span').each(function (index, itemSpan) {
            $(itemSpan).addClass('hidden');
        });
    }

    function onKeydownAutofillLocationInput(event){
        if (event.keyCode === 13) {
            $('.location-item-span').each(function (index, itemSpan) {
                if ($(itemSpan).hasClass('location-item-span-focus')){
                    $('.location-input').val($(itemSpan).find('input.location-name').val())
                }
            });
        }
    }

    function toggleLocationItemSpanFocus(event) {
        const locationItemSpans = $('.location-item-span');
        const hasFocus = locationItemSpans.hasClass('location-item-span-focus');

        locationItemSpans.each(function (index, itemSpan) {
            const isItemFocus = $(itemSpan).hasClass('location-item-span-focus');
            if (event.which === 38 && isItemFocus) {
                $(itemSpan).removeClass('location-item-span-focus');
                locationItemSpans.eq(index - 1).addClass('location-item-span-focus');
                return false;
            } else if (event.which === 40 && isItemFocus) {
                $(itemSpan).removeClass('location-item-span-focus');
                if (index === locationItemSpans.length - 1){
                    locationItemSpans.eq(0).addClass('location-item-span-focus');
                }
                locationItemSpans.eq(index + 1).addClass('location-item-span-focus');
                return false;
            }
        });
        if (event.which === 38 && !hasFocus || event.which === 40 && !hasFocus) {
            locationItemSpans.eq(0).addClass('location-item-span-focus');
        }
    }
});
