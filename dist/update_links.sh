#!/bin/bash

# قائمة الصفحات المراد تحديثها (باستثناء index.html و about.html و contact.html التي تم تحديثها بالفعل)
pages=("brand-identity.html" "website-development.html" "landing-pages.html" "ecommerce-stores.html" "reservation-systems.html" "erp-crm-systems.html" "service.html" "member.html")

echo "=== بدء تحديث الروابط في جميع الصفحات ==="

for page in "${pages[@]}"; do
    if [ -f "$page" ]; then
        echo "تحديث $page..."
        
        # تحديث رابط خدماتنا الرئيسي
        sed -i 's|<a href="#">|<a href="/#Services">|g' "$page"
        
        # تحديث روابط الخدمات الفرعية مع إضافة target="_blank"
        sed -i 's|<a href="brand-identity.html">|<a href="brand-identity.html" target="_blank">|g' "$page"
        sed -i 's|<a href="website-development.html">|<a href="website-development.html" target="_blank">|g' "$page"
        sed -i 's|<a href="landing-pages.html">|<a href="landing-pages.html" target="_blank">|g' "$page"
        sed -i 's|<a href="ecommerce-stores.html">|<a href="ecommerce-stores.html" target="_blank">|g' "$page"
        sed -i 's|<a href="reservation-systems.html">|<a href="reservation-systems.html" target="_blank">|g' "$page"
        sed -i 's|<a href="erp-crm-systems.html">|<a href="erp-crm-systems.html" target="_blank">|g' "$page"
        
        # تحديث روابط وسائل التواصل الاجتماعي مع إضافة target="_blank"
        sed -i 's|<a href="https://www.facebook.com/profile.php?id=61577047883984">|<a href="https://www.facebook.com/profile.php?id=61577047883984" target="_blank">|g' "$page"
        sed -i 's|<a href="https://www.linkedin.com/company/icode-eg/">|<a href="https://www.linkedin.com/company/icode-eg/" target="_blank">|g' "$page"
        
        # تحديث روابط الفوتر لتطابق الصفحة الرئيسية
        sed -i 's|<a href="#">خدماتنا</a>|<a href="/#Services">خدماتنا</a>|g' "$page"
        sed -i 's|<a href="#">الأسئلة الشائعة</a>|<a href="/about.html#faq">الأسئلة الشائعة</a>|g' "$page"
        sed -i 's|<form action="">|<form action="/subscribe">|g' "$page"
        
        echo "✅ تم تحديث $page"
    else
        echo "❌ الملف $page غير موجود"
    fi
done

echo ""
echo "=== تم الانتهاء من تحديث جميع الصفحات ==="
echo ""
echo "التحقق من النتائج:"
echo "عدد الروابط المحدثة بـ target=\"_blank\":"
grep -c 'target="_blank"' *.html | head -5
