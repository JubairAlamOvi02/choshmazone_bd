import React from 'react';
import Shop from './Shop';

const Home = () => {
    const orgJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Choshmazone",
        "url": "https://choshmazone.com",
        "logo": "https://choshmazone.com/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+8801XXXXXXXXX",
            "contactType": "customer service"
        }
    };

    const websiteJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Choshmazone",
        "url": "https://choshmazone.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://choshmazone.com/shop?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <script type="application/ld+json">
                {JSON.stringify(orgJsonLd)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteJsonLd)}
            </script>
            {/* Hero Section */}
            <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black/90"></div>
                <div className="absolute inset-0 z-[-1] bg-[url('https://images.unsplash.com/photo-1511499767390-a7335958beab?q=80&w=2080')] bg-cover bg-center animate-ken-burns"></div>

                <div className="z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/50">
                        CHOSHMAZONE
                    </h1>
                    <p className="text-lg md:text-2xl text-white/60 mb-10 font-light tracking-wide max-w-2xl mx-auto">
                        Premium eyewear for the bold. Experience luxury designed for your vision.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <button className="px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-500 transform hover:scale-105 active:scale-95">
                            Explore Collection
                        </button>
                    </div>
                </div>
            </div>

            <Shop />
        </div>
    );
};

export default Home;
