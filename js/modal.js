// 操作方法を書いたモーダルの表示・非表示
$( '.modal-wrapper' ).fadeIn( 300 );
$( '.js-modal-open' ).on( 'click', function() {
    $( '.modal-wrapper' ).fadeIn( 300 );
    return false;
});
$( '.js-modal-close' ).on( 'click', function() {
    $( '.modal-wrapper' ).fadeOut( 300 );
    return false;
});