<?php
/**
 * CHIMERA SEO ENGINE v5.0 – GEO-BLITZ EDITION
 * Generates 60+ location pages, sitemap, and internal link web.
 * Author: CAT Shadow Hacker
 */

define('ROOT', __DIR__);
define('CACHE_DIR', ROOT.'/cache/');
define('DATA_DIR', ROOT.'/data/');
define('DOMAIN', 'https://' . $_SERVER['HTTP_HOST']);

// =============================================================
// 1. EXPANDED KEYWORD LIST (38 TN Districts + Metros + Global)
// =============================================================
define('KEYWORDS', [
    // Tamil Nadu (38 Districts)
    'Tirupur', 'Dindigul', 'Coimbatore', 'Erode', 'Salem', 'Madurai',
    'Chennai', 'Tiruchirappalli', 'Tanjore', 'Kanyakumari', 'Vellore',
    'Ranipet', 'Kancheepuram', 'Thoothukudi', 'Virudhunagar', 'Ramanathapuram',
    'Sivaganga', 'Pudukkottai', 'Nagapattinam', 'Thanjavur', 'Namakkal',
    'Dharmapuri', 'Krishnagiri', 'Hosur', 'Ariyalur', 'Cuddalore', 'Kallakurichi',
    'Karur', 'Mayiladuthurai', 'Nilgiris', 'Perambalur', 'Tenkasi',
    'Theni', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Viluppuram',
    // Indian Metros
    'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune', 'Ahmedabad', 'Kolkata',
    'Jaipur', 'Lucknow', 'Nagpur', 'Indore', 'Bhopal', 'Visakhapatnam',
    // Global Cities
    'Dubai', 'Singapore', 'London', 'New York', 'Sydney', 'Toronto'
]);

// Create cache directories (automatically sets permissions)
if (!is_dir(CACHE_DIR)) mkdir(CACHE_DIR, 0755, true);
if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0755, true);

// =============================================================
// 2. ROUTER – Handle requests
// =============================================================
$uri = $_SERVER['REQUEST_URI'];

// Sitemap
if (strpos($uri, '/sitemap.xml') === 0) { generateSitemap(); exit; }
// Robots
if (strpos($uri, '/robots.txt') === 0) { generateRobots(); exit; }
// Stats
if (strpos($uri, '/seo-stats') === 0) { showStats(); exit; }
// Beacons (silent log)
if (isset($_GET['dwell']) || isset($_GET['scroll'])) { exit; }

// Programmatic Pages: /topic/tirupur, /topic/bangalore
if (preg_match('#^/topic/([a-zA-Z0-9\-]+)$#', $uri, $match)) {
    generateProgrammaticPage($match[1]);
    exit;
}

// =============================================================
// 3. SITEMAP GENERATOR
// =============================================================
function generateSitemap() {
    $cache = CACHE_DIR.'sitemap.xml';
    if (file_exists($cache) && (time() - filemtime($cache) < 21600)) { // 6 hours
        readfile($cache); return;
    }
    $urls = [
        DOMAIN, DOMAIN.'/services.html', DOMAIN.'/pricing.html', 
        DOMAIN.'/portfolio.html', DOMAIN.'/contact.html'
    ];
    foreach (KEYWORDS as $kw) {
        $urls[] = DOMAIN.'/topic/'.slugify($kw);
    }
    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
    foreach ($urls as $u) {
        $xml .= "<url><loc>$u</loc><lastmod>".date('Y-m-d')."</lastmod><priority>0.8</priority></url>\n";
    }
    $xml .= '</urlset>';
    file_put_contents($cache, $xml);
    header('Content-Type: application/xml');
    echo $xml;
}

// =============================================================
// 4. ROBOTS.TXT
// =============================================================
function generateRobots() {
    header('Content-Type: text/plain');
    echo "User-agent: *\nAllow: /\nSitemap: ".DOMAIN."/sitemap.xml\n";
    echo "Disallow: /seo-engine.php\nDisallow: /cache/\nDisallow: /data/\n";
}

// =============================================================
// 5. PROGRAMMATIC PAGE GENERATOR (The City Pages)
// =============================================================
function generateProgrammaticPage($slug) {
    $cache = CACHE_DIR.'page_'.$slug.'.html';
    // Cache refresh every 24 hours
    if (file_exists($cache) && (time() - filemtime($cache) < 86400)) {
        readfile($cache); return;
    }

    $keyword = str_replace('-', ' ', $slug);
    $city = ucwords($keyword);
    $home = DOMAIN;

    // Start building the HTML page
    $content = "<!DOCTYPE html><html lang='en'><head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Website Development in $city | Noctis Technologies – ₹1,999</title>
    <meta name='description' content='Get premium, responsive website development in $city starting at ₹1,999. Serving businesses in $city, Tamil Nadu, and worldwide. Free quote today!'>
    <meta name='robots' content='index, follow'>
    <link rel='canonical' href='$home/topic/$slug'>
    </head>
    <body style='font-family:Inter, sans-serif; max-width:920px; margin:30px auto; padding:20px; background:#fcfcfb; color:#1a1a1a; line-height:1.8;'>
    
    <!-- PREMIUM HEADER (Matches your brand) -->
    <div style='border-bottom:2px solid #2F66F3; padding-bottom:15px; margin-bottom:30px; display:flex; align-items:center; gap:12px;'>
        <span style='font-size:1.5rem; font-weight:800; letter-spacing:2px; color:#1a1a1a;'>NOCTIS</span>
        <span style='color:#98A38E; font-weight:500;'>Technologies</span>
    </div>

    <h1 style='color:#2F66F3; font-size:2.4rem;'>Premium Website Development in $city – Starting ₹1,999</h1>
    <p style='font-size:1.2rem; margin-bottom:20px;'>Noctis Technologies delivers modern, responsive, and SEO-optimized websites for businesses in <strong>$city</strong>, Dindigul, Tirupur, and across Tamil Nadu.</p>
    
    <p>Whether you need a small business website, an e-commerce platform, or a custom web application, our team provides end-to-end development services tailored to your requirements.</p>
    
    <h2 style='margin-top:30px;'>Why Choose Noctis Technologies in $city?</h2>
    <ul style='padding-left:20px;'>
        <li>✅ 100% Responsive Design – Works on mobile, tablet, laptop, and desktop</li>
        <li>✅ Starting Price ₹1,999 – Transparent and affordable</li>
        <li>✅ Free Consultation – We understand your business first</li>
        <li>✅ SEO-Ready Structure – Built to rank on Google</li>
        <li>✅ Dedicated Support – We're here even after launch</li>
    </ul>
    
    <div style='margin:30px 0; padding:20px; background:#EEF2EB; border-radius:16px; text-align:center;'>
        <a href='$home/contact.html' style='background:#2F66F3; color:#fff; padding:14px 32px; border-radius:999px; text-decoration:none; font-weight:600; display:inline-block;'>Get a Free Quote for $city</a>
    </div>
    
    <p><strong>Explore more:</strong> <a href='$home/pricing.html'>View Complete Pricing</a> | <a href='$home/portfolio.html'>See Our Portfolio</a></p>
    <p style='margin-top:30px; font-size:0.9rem; color:#6E737B;'>Serving clients in $city, Dindigul, Coimbatore, Chennai, Bangalore, and globally.</p>

    <!-- FOOTER (Mini) -->
    <div style='margin-top:50px; padding-top:20px; border-top:1px solid #E7E9EC; font-size:0.8rem; color:#9EA3AA; text-align:center;'>
        © 2026 Noctis Technologies. All rights reserved.
    </div>

    <!-- =============================================================
    CRITICAL: INJECT SEO-MASTER.JS (The Brain that adds schemas/meta)
    ============================================================= -->
    <script src='$home/seo-master.js'></script>

    <!-- =============================================================
    HIDDEN INTERNAL LINK INJECTION (Link Juice Web)
    ============================================================= -->
    <div style='display:none;' aria-hidden='true'>
        <a href='$home/services.html'>Web Development Services</a>
        <a href='$home/pricing.html'>Website Cost ₹1999</a>
        <a href='$home/portfolio.html'>Our Portfolio</a>
        <a href='$home/contact.html'>Contact Noctis</a>";

    // Add 3 random city links to spread link juice
    $cityList = KEYWORDS;
    shuffle($cityList);
    $counter = 0;
    foreach ($cityList as $c) {
        if ($counter >= 3) break;
        if (strtolower($c) !== strtolower($city)) {
            $content .= '<a href="'.DOMAIN.'/topic/'.slugify($c).'">Website in '.ucwords($c).'</a>';
            $counter++;
        }
    }
    // If we didn't get 3, pad with fallbacks
    if ($counter < 3) {
        $fallbacks = ['Tirupur', 'Dindigul', 'Coimbatore'];
        foreach ($fallbacks as $fb) {
            if ($counter >= 3) break;
            if (strtolower($fb) !== strtolower($city)) {
                $content .= '<a href="'.DOMAIN.'/topic/'.slugify($fb).'">Website in '.$fb.'</a>';
                $counter++;
            }
        }
    }
    
    $content .= "    </div>
    </body></html>";

    // Save to cache
    file_put_contents($cache, $content);
    echo $content;
}

// =============================================================
// 6. HELPER FUNCTIONS
// =============================================================
function slugify($str) {
    return strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $str), '-'));
}

function showStats() {
    echo "<pre>CHIMERA SEO ENGINE STATUS:\n";
    echo "Active Keywords: ".count(KEYWORDS)."\n";
    echo "Cached Pages: ".count(glob(CACHE_DIR.'*.html'))."\n";
    echo "Last Sitemap: ".@date('Y-m-d H:i', filemtime(CACHE_DIR.'sitemap.xml'))."\n";
    echo "Domain: ".DOMAIN."\n";
    echo "Go kill it, Butter.</pre>";
}
?>