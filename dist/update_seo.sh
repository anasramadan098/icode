#!/bin/bash

echo "=== بدء تحديث SEO والفافيكون لجميع الصفحات ==="

# تحديث contact.html
echo "تحديث contact.html..."
sed -i '/<title>/c\
    <!-- SEO Meta Tags -->\
    <title>اتصل بنا - ICode | تواصل مع خبراء تطوير البرمجيات والحلول الرقمية</title>\
    <meta name="description" content="تواصل مع فريق ICode للحصول على استشارة مجانية حول مشروعك. نحن هنا لمساعدتك في تطوير المواقع، التطبيقات، والحلول الرقمية المخصصة.">\
    <meta name="keywords" content="اتصل بنا ICode, استشارة مجانية, تواصل معنا, خدمة عملاء, دعم فني, تطوير مواقع مصر">\
    <meta name="author" content="ICode">\
    <meta name="robots" content="index, follow">\
    <link rel="canonical" href="https://icode.com/contact.html">\
    \
    <!-- Open Graph Meta Tags -->\
    <meta property="og:title" content="اتصل بنا - ICode | تواصل مع خبراء تطوير البرمجيات">\
    <meta property="og:description" content="تواصل مع فريق ICode للحصول على استشارة مجانية حول مشروعك الرقمي.">\
    <meta property="og:type" content="website">\
    <meta property="og:url" content="https://icode.com/contact.html">\
    <meta property="og:image" content="https://icode.com/imgs/logo.png">\
    <meta property="og:site_name" content="ICode">\
    <meta property="og:locale" content="ar_EG">\
    \
    <!-- Twitter Card Meta Tags -->\
    <meta name="twitter:card" content="summary_large_image">\
    <meta name="twitter:title" content="اتصل بنا - ICode | تواصل مع خبراء تطوير البرمجيات">\
    <meta name="twitter:description" content="تواصل مع فريق ICode للحصول على استشارة مجانية حول مشروعك الرقمي.">\
    <meta name="twitter:image" content="https://icode.com/imgs/logo.png">\
    \
    <!-- Favicon -->\
    <link rel="icon" type="image/x-icon" href="imgs/logo.png">\
    <link rel="apple-touch-icon" href="imgs/logo.png">\
    <link rel="icon" type="image/png" sizes="32x32" href="imgs/logo.png">\
    <link rel="icon" type="image/png" sizes="16x16" href="imgs/logo.png">
' contact.html

# تحديث brand-identity.html
echo "تحديث brand-identity.html..."
sed -i '/<title>/c\
    <!-- SEO Meta Tags -->\
    <title>تطوير هوية العلامة التجارية - ICode | تصميم هوية بصرية احترافية</title>\
    <meta name="description" content="خدمات تطوير هوية العلامة التجارية من ICode. نصمم هوية بصرية احترافية ومتكاملة تعكس قيم علامتك التجارية وتميزك عن المنافسين.">\
    <meta name="keywords" content="تطوير هوية تجارية, تصميم لوجو, هوية بصرية, تصميم جرافيك, علامة تجارية, برندنج, تصميم احترافي">\
    <meta name="author" content="ICode">\
    <meta name="robots" content="index, follow">\
    <link rel="canonical" href="https://icode.com/brand-identity.html">\
    \
    <!-- Open Graph Meta Tags -->\
    <meta property="og:title" content="تطوير هوية العلامة التجارية - ICode">\
    <meta property="og:description" content="خدمات تطوير هوية العلامة التجارية الاحترافية من ICode.">\
    <meta property="og:type" content="service">\
    <meta property="og:url" content="https://icode.com/brand-identity.html">\
    <meta property="og:image" content="https://icode.com/imgs/logo.png">\
    <meta property="og:site_name" content="ICode">\
    <meta property="og:locale" content="ar_EG">\
    \
    <!-- Twitter Card Meta Tags -->\
    <meta name="twitter:card" content="summary_large_image">\
    <meta name="twitter:title" content="تطوير هوية العلامة التجارية - ICode">\
    <meta name="twitter:description" content="خدمات تطوير هوية العلامة التجارية الاحترافية من ICode.">\
    <meta name="twitter:image" content="https://icode.com/imgs/logo.png">\
    \
    <!-- Favicon -->\
    <link rel="icon" type="image/x-icon" href="imgs/logo.png">\
    <link rel="apple-touch-icon" href="imgs/logo.png">\
    <link rel="icon" type="image/png" sizes="32x32" href="imgs/logo.png">\
    <link rel="icon" type="image/png" sizes="16x16" href="imgs/logo.png">
' brand-identity.html

echo "✅ تم تحديث الصفحات الأساسية"
echo "يرجى تشغيل الجزء الثاني من السكريبت لتحديث باقي الصفحات"
