<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>

{{-- <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>{{url('/')}}/sitemap.xml/posts</loc>
    </sitemap>
    <sitemap>
        <loc>{{url('/')}}/sitemap.xml/products</loc>
    </sitemap>

</sitemapindex> --}}

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    @foreach ($posts as $post)
        <url>
            <loc>{{url('/')}}/posts/{{ $post->slug }}</loc>
            <lastmod>{{ $post->created_at->tz('UTC')->toAtomString() }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
    @endforeach
    @foreach ($products as $product)
        <url>
            <loc>{{url('/')}}/products/{{ $product->slug }}</loc>
            <lastmod>{{ $product->created_at->tz('UTC')->toAtomString() }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
    @endforeach
</urlset>