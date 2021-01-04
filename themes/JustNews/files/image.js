jQuery(document).ready(function($){if(fifuImageVars.fifu_lazy)
fifu_lazy();disableClick($);disableLink($);setTimeout(function(){jQuery('img.zoomImg').css('z-index','');},1000);jQuery('img[height=1]').each(function(index){if(jQuery(this).attr('width')!=1)
jQuery(this).css('position','relative');});});jQuery(window).on('ajaxComplete',function(){if(fifuImageVars.fifu_lazy)
fifu_lazy();});function disableClick($){if(!fifuImageVars.fifu_woo_lbox_enabled){firstParentClass='';parentClass='';jQuery('figure.woocommerce-product-gallery__wrapper').find('div.woocommerce-product-gallery__image').each(function(index){parentClass=jQuery(this).parent().attr('class').split(' ')[0];if(!firstParentClass)
firstParentClass=parentClass;if(parentClass!=firstParentClass)
return false;jQuery(this).children().click(function(){return false;});jQuery(this).children().children().css("cursor","default");});}}
function disableLink($){if(!fifuImageVars.fifu_woo_lbox_enabled){firstParentClass='';parentClass='';jQuery('figure.woocommerce-product-gallery__wrapper').find('div.woocommerce-product-gallery__image').each(function(index){parentClass=jQuery(this).parent().attr('class').split(' ')[0];if(!firstParentClass)
firstParentClass=parentClass;if(parentClass!=firstParentClass)
return false;jQuery(this).children().attr("href","");});}}
jQuery(document).click(function($){fifu_fix_gallery_height();})
function fifu_fix_gallery_height(){if(fifuImageVars.fifu_is_flatsome_active){mainImage=jQuery('.woocommerce-product-gallery__wrapper div.flickity-viewport').find('img')[0];if(mainImage)
jQuery('.woocommerce-product-gallery__wrapper div.flickity-viewport').css('height',mainImage.clientHeight+'px');}}