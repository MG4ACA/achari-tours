/**
 * useBlog — Blog data composable for Achari Tours
 *
 * Strategy: Static seed data is used while Directus is not yet configured
 * with real content. When Directus has articles published, `getBlogArticles`
 * and `getArticleBySlug` from useDirectus() will take over automatically.
 *
 * To switch to live Directus data, set NUXT_PUBLIC_USE_DIRECTUS_BLOG=true
 * in your .env file.
 */

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  category: BlogCategory
  categoryLabel: string
  coverImage: string
  publishedAt: string
  readTime: number
  author: string
  tags: string[]
  featured: boolean
}

export type BlogCategory =
  | 'cultural'
  | 'wildlife'
  | 'food'
  | 'tips'
  | 'hidden-gems'
  | 'itineraries'

export const BLOG_CATEGORIES: { value: BlogCategory | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'All Articles', icon: '📰' },
  { value: 'cultural', label: 'Cultural Experiences', icon: '🏛️' },
  { value: 'wildlife', label: 'Wildlife & Nature', icon: '🐘' },
  { value: 'food', label: 'Food & Cuisine', icon: '🍛' },
  { value: 'tips', label: 'Travel Tips', icon: '🧭' },
  { value: 'hidden-gems', label: 'Hidden Gems', icon: '💎' },
  { value: 'itineraries', label: 'Itinerary Guides', icon: '🗺️' },
]

// ─── Seed Articles ────────────────────────────────────────────────────────────
// Replace these with real Directus content once articles are published.
// Image paths point to /images/blog/ — drop your generated images there.

export const SEED_ARTICLES: BlogPost[] = [
  {
    id: '1',
    slug: 'kandy-temple-tooth-relic-guide',
    title: "Sri Lanka's Sacred Heart: A Complete Guide to the Temple of the Tooth",
    excerpt:
      'Few places on Earth carry as much spiritual weight as the Temple of the Tooth Relic in Kandy. Discover the rituals, best times to visit, and what to expect at this UNESCO-listed treasure.',
    body: `
<p>Nestled on the shores of Kandy Lake, surrounded by cool highland air and the scent of incense, the <strong>Sri Dalada Maligawa</strong> — Temple of the Sacred Tooth Relic — stands as the spiritual heartbeat of Sri Lanka. It houses what is believed to be the left canine tooth of the Buddha, and for over 2,500 years it has drawn pilgrims, kings, and now curious travelers from across the world.</p>

<h2>The Significance of the Relic</h2>
<p>The relic's history reads like an epic adventure novel. It was smuggled out of India in the 4th century CE, hidden in the hair of a princess, and has since been the symbol of political legitimacy in Sri Lanka — whoever held the relic, held the nation. Today it rests in a golden casket inside a beautiful octagonal chamber on the second floor of the temple.</p>

<h2>The Daily Puja Ceremonies</h2>
<p>Three times a day — at 5:30am, 9:30am, and 6:30pm — the temple erupts in sacred ritual. Drumming echoes through the corridors, conch shells sound, and the inner chamber doors open to allow the faithful to glimpse the golden reliquary. Even if you're not Buddhist, witnessing a puja is a genuinely moving experience.</p>

<h2>Practical Tips</h2>
<ul>
  <li><strong>Dress code:</strong> Cover shoulders and knees. Sarongs are available to borrow at the entrance.</li>
  <li><strong>Best time to visit:</strong> Arrive 20 minutes before a puja for a good position. Early morning is quieter and more atmospheric.</li>
  <li><strong>Esala Perahera:</strong> If you visit in July or August, Sri Lanka's grandest festival parades the reliquary through Kandy for 10 consecutive nights — a once-in-a-lifetime spectacle.</li>
  <li><strong>Photography:</strong> Allowed in most areas, but always be respectful and quiet during prayer time.</li>
</ul>

<h2>Getting There</h2>
<p>Kandy is roughly 3 hours from Colombo by road, or a scenic 6-hour train ride from Colombo Fort station — one of the most beautiful railway journeys in the world. Achari Tours always includes the temple in our Cultural Triangle itineraries, paired with a walking tour of the vibrant Kandy city market.</p>
    `.trim(),
    category: 'cultural',
    categoryLabel: 'Cultural Experiences',
    coverImage: '/images/blog/blog-kandy-temple.jpg',
    publishedAt: '2024-11-15',
    readTime: 7,
    author: 'Achari Tours Team',
    tags: ['Kandy', 'Temple', 'Buddhism', 'UNESCO', 'Cultural Triangle'],
    featured: true,
  },
  {
    id: '2',
    slug: 'yala-national-park-leopard-safari-guide',
    title: 'Yala National Park: How to Find Sri Lanka\'s Elusive Leopard',
    excerpt:
      'With the highest density of leopards of any park in the world, Yala gives you a real chance of a sighting. Here is everything you need to know before your safari.',
    body: `
<p>Sri Lanka's <strong>Yala National Park</strong> covers 979 square kilometres of scrub jungle, grassland, and coastline in the island's deep south. It is home to elephants, sloth bears, crocodiles, over 200 species of birds — and most famously, the <strong>Sri Lankan leopard</strong> (<em>Panthera pardus kotiya</em>), a subspecies found nowhere else on Earth.</p>

<h2>Why Yala is Special for Leopard Spotting</h2>
<p>Yala's Block 1 — the section open to visitors — has one of the highest leopard densities anywhere in the world: roughly one leopard per 5km². Crucially, the dry, open terrain means leopards are far more visible than in denser African jungle. Experienced guides know individual leopards by name, and a skilled tracker can often find a big cat within the first hour.</p>

<h2>Best Time to Visit</h2>
<p>The park closes from September to mid-October annually for a rest period. The best sightings happen during the dry season from <strong>February to July</strong>, when water sources concentrate wildlife in predictable spots. Early morning and late afternoon drives are the most productive — leopards are largely crepuscular.</p>

<h2>Safari Etiquette</h2>
<ul>
  <li>Never leave your jeep inside the park boundaries.</li>
  <li>Maintain a respectful distance from all wildlife — 30 metres is a good rule of thumb for big cats.</li>
  <li>Do not feed any animals. Ever.</li>
  <li>Keep voices low and engines off when observing wildlife.</li>
  <li>Choose operators with responsible wildlife policies. Achari Tours works exclusively with guides who prioritise animal welfare over photo opportunities.</li>
</ul>

<h2>What Else to See</h2>
<p>Beyond leopards, Yala harbours large herds of elephants, endemic birds like the Sri Lanka junglefowl (the national bird), painted storks, and the occasional sloth bear lumbering through the undergrowth. The park's coastline is stunning — you may spot dolphins offshore during your game drive.</p>
    `.trim(),
    category: 'wildlife',
    categoryLabel: 'Wildlife & Nature',
    coverImage: '/images/blog/blog-yala-leopard.jpg',
    publishedAt: '2024-11-10',
    readTime: 8,
    author: 'Achari Tours Team',
    tags: ['Yala', 'Leopard', 'Safari', 'Wildlife', 'National Park'],
    featured: true,
  },
  {
    id: '3',
    slug: 'sri-lankan-rice-and-curry-food-guide',
    title: 'Rice, Curry & Everything in Between: Sri Lanka\'s Food Culture Explained',
    excerpt:
      'Sri Lankan cuisine is an explosion of colour, spice, and flavour rooted in centuries of cultural exchange. Here is your complete guide to eating like a local.',
    body: `
<p>Sri Lankan food doesn't play it safe. From the moment a banana leaf is placed in front of you, piled high with a dozen small dishes of rice and curry, you understand that meals here are an event. This is not just food — it is a culture, a geography, and a history on a plate.</p>

<h2>The Foundation: Rice and Curry</h2>
<p>A traditional <strong>rice and curry</strong> meal consists of steamed white or red rice surrounded by an array of curries: usually a main protein (fish, chicken, or jackfruit for vegetarians), a lentil dal, a coconut-based vegetable curry, and several small condiments like pol sambol (freshly grated coconut with chilli and lime), seeni sambol (caramelised onion relish), and papadum.</p>

<h2>Essential Dishes to Try</h2>
<ul>
  <li><strong>Kottu Roti:</strong> Stir-fried shredded flatbread with egg, vegetables, and your choice of meat. The rhythmic clatter of metal blades chopping the kottu is the soundtrack of every Sri Lankan evening.</li>
  <li><strong>Hoppers (Appam):</strong> Bowl-shaped rice flour and coconut milk crepes, often served with an egg cracked into the centre. A breakfast staple.</li>
  <li><strong>String Hoppers:</strong> Steamed rice noodle discs, eaten for breakfast with coconut milk gravy and sambol.</li>
  <li><strong>Lamprais:</strong> A Dutch-influenced dish — rice cooked in stock with a selection of curries and sambols, all wrapped in a banana leaf and baked. A legacy of the Burgher community.</li>
  <li><strong>Watalappan:</strong> A rich, jiggly steamed custard made with kithul jaggery (palm sugar), coconut milk, and cardamom. The finest dessert on the island.</li>
</ul>

<h2>Where to Eat</h2>
<p>The best Sri Lankan food is not in tourist restaurants — it's in the roadside <em>kades</em> (small local eateries) and at homestays. On all Achari Tours itineraries, we make it a point to stop at the places our guides actually eat, not the ones designed for foreign palates.</p>
    `.trim(),
    category: 'food',
    categoryLabel: 'Food & Cuisine',
    coverImage: '/images/blog/blog-rice-and-curry.jpg',
    publishedAt: '2024-11-05',
    readTime: 6,
    author: 'Achari Tours Team',
    tags: ['Food', 'Cuisine', 'Rice and Curry', 'Local Culture', 'Kottu'],
    featured: false,
  },
  {
    id: '4',
    slug: 'best-time-to-visit-sri-lanka',
    title: 'When to Visit Sri Lanka: A Month-by-Month Weather and Events Guide',
    excerpt:
      'Sri Lanka has two monsoon seasons affecting different coasts. Understanding them will help you plan the perfect trip — no matter when you travel.',
    body: `
<p>One of the most common questions we receive at Achari Tours is: "When is the best time to visit Sri Lanka?" The honest answer is that <strong>there is no single bad time</strong> — but there is a best time for <em>what you specifically want to do</em>. Sri Lanka's geography means it is always somewhere on the island.</p>

<h2>Understanding the Two Monsoons</h2>
<p>Sri Lanka is influenced by two distinct monsoon systems:</p>
<ul>
  <li><strong>Southwest Monsoon (Yala):</strong> May–August. Brings heavy rain to the west and southwest coasts, the central highlands, and Colombo. The east coast and Cultural Triangle remain largely sunny.</li>
  <li><strong>Northeast Monsoon (Maha):</strong> November–February. Affects the north and east coasts. The south and west coasts enjoy their driest, sunniest weather.</li>
</ul>

<h2>Month-by-Month Guide</h2>
<p><strong>December – March:</strong> Peak season. The south and west coasts (Galle, Mirissa, Colombo) are at their best. Excellent for whale watching off Mirissa. The Cultural Triangle is hot but dry. Expect higher prices and crowds.</p>
<p><strong>April:</strong> The Sinhala and Tamil New Year falls on April 13–14 — a joyful, culturally rich time to be in Sri Lanka. Transitional weather nationwide.</p>
<p><strong>May – August:</strong> Rain on the west coast, but the east coast (Arugam Bay, Trincomalee) is glorious. This is the best season for surfing at Arugam Bay. Yala National Park offers excellent wildlife sightings before the September closure.</p>
<p><strong>July – August:</strong> Esala Perahera in Kandy — one of Asia's most spectacular festivals. Book accommodation 6+ months in advance.</p>
<p><strong>September – October:</strong> Inter-monsoon transition. Some rain across the island, but also dramatic skies and lush, green scenery. Fewer crowds and lower prices.</p>
<p><strong>November:</strong> East coast opens up. The northeast monsoon begins — head to the south and west.</p>
    `.trim(),
    category: 'tips',
    categoryLabel: 'Travel Tips',
    coverImage: '/images/blog/blog-best-time-visit.jpg',
    publishedAt: '2024-10-28',
    readTime: 9,
    author: 'Achari Tours Team',
    tags: ['Planning', 'Weather', 'Monsoon', 'Travel Tips', 'Seasons'],
    featured: false,
  },
  {
    id: '5',
    slug: 'ella-rock-hidden-gems-hill-country',
    title: 'Ella Rock and Beyond: Sri Lanka\'s Best-Kept Hill Country Secrets',
    excerpt:
      'Everyone goes to Ella. Far fewer find the wild trails, waterfall pools, and village paths that make the surrounding hill country truly magical. Here is what the guidebooks miss.',
    body: `
<p>Ella has become something of a Sri Lankan icon. The train from Kandy through the misty tea country to Ella station is rightly world-famous. But the town itself can feel crowded on peak-season days, its main street a familiar parade of rooftop restaurants and Instagram backdrops. Step beyond the main drag, and you enter a different world.</p>

<h2>Ella Rock: The Walk That Changes Everything</h2>
<p><strong>Ella Rock</strong> is the real prize — a summit hike that rewards with panoramic views across a sea of green tea bushes and misty valleys, with the dramatic gap in the mountains framing the horizon. The trail begins at Ella railway station and winds through a working tea estate before climbing steeply through jungle.</p>
<p>The hike takes 3–4 hours return. Start before 7am to beat both the heat and other hikers, and arrive at the summit for sunrise if you can. Bring water, wear grippy shoes, and consider hiring a local guide from the village — they know the unmarked trail junctions that will leave you wandering otherwise.</p>

<h2>Hidden Finds Around Ella</h2>
<ul>
  <li><strong>Ravana Falls (the upper cascade):</strong> Most visitors see the main Ravana Falls from the road. Very few walk the 45-minute trail to the upper cascade, a wide curtain of water falling into a natural pool — perfect for a cool swim.</li>
  <li><strong>Demodera Nine Arches Bridge:</strong> 3km from Ella, this colonial-era viaduct is best seen at 7am or 3pm when the blue train crosses it. The walk there through paddy fields is as good as the destination.</li>
  <li><strong>Lipton's Seat:</strong> A 45-minute drive from Ella, this viewpoint above Haputale was the favourite spot of tea pioneer Sir Thomas Lipton. On clear mornings, you can see both coasts of Sri Lanka simultaneously.</li>
  <li><strong>Rawana Ella Cave:</strong> A small cave temple above Ella, rarely visited by foreign tourists, with ancient rock paintings and a friendly resident monk who will tell you the mythological history of the site.</li>
</ul>
    `.trim(),
    category: 'hidden-gems',
    categoryLabel: 'Hidden Gems',
    coverImage: '/images/blog/blog-ella-rock.jpg',
    publishedAt: '2024-10-20',
    readTime: 7,
    author: 'Achari Tours Team',
    tags: ['Ella', 'Hill Country', 'Hiking', 'Hidden Gems', 'Tea Country'],
    featured: true,
  },
  {
    id: '6',
    slug: '10-day-sri-lanka-classic-itinerary',
    title: 'The Perfect 10-Day Sri Lanka Itinerary: Culture, Wildlife & Coast',
    excerpt:
      'Ten days is the sweet spot for experiencing the best of Sri Lanka — from ancient temples and wildlife safaris to spice gardens, hill country trains, and white-sand beaches.',
    body: `
<p>Ten days in Sri Lanka won't show you everything — this island rewards years of return visits. But a well-planned 10-day route will give you a rich cross-section: the ancient wonders of the Cultural Triangle, the wildlife of the southern national parks, the cool hills of tea country, and the turquoise coast. Here is the route our guests consistently rate as their favourite.</p>

<h2>Day-by-Day Itinerary</h2>

<h3>Day 1–2: Colombo & Negombo</h3>
<p>Arrive into Bandaranaike International Airport (near Negombo). Spend day 1 recovering and exploring Negombo's fishing harbour and Dutch canal. On day 2, drive south into Colombo for a street food walk through Pettah market, the Gangaramaya Temple, and Galle Face Green at sunset.</p>

<h3>Day 3–4: Cultural Triangle (Sigiriya & Polonnaruwa)</h3>
<p>Head north to the Cultural Triangle. Climb Sigiriya Rock Fortress — the ancient "lion rock" — in the cool morning hours. In the afternoon, explore the remarkable ruined city of Polonnaruwa by bicycle, a UNESCO World Heritage Site spanning several square kilometres.</p>

<h3>Day 5: Dambulla & Kandy</h3>
<p>Visit the Dambulla Cave Temple complex with its 153 Buddha statues before winding through spice gardens on the way to Kandy. Evening puja at the Temple of the Tooth Relic.</p>

<h3>Day 6: Kandy to Ella by Train</h3>
<p>Board the scenic train at Kandy station. The 6-hour journey through emerald tea estates, waterfalls, and mist is one of the world's great rail experiences. Arrive in Ella by evening.</p>

<h3>Day 7: Ella Hikes</h3>
<p>Sunrise at Ella Rock. Afternoon walk to Nine Arches Bridge and the upper Ravana Falls.</p>

<h3>Day 8: Ella to Yala</h3>
<p>Drive south through the spice-scented lowland towns to Yala. Afternoon game drive.</p>

<h3>Day 9: Yala Safari & South Coast</h3>
<p>Early morning safari in Yala (prime leopard-spotting hours). Afternoon transfer to the south coast — Mirissa or Tangalle.</p>

<h3>Day 10: South Coast & Departure</h3>
<p>Morning on the beach. Transfer to Colombo for your onward flight.</p>

<h2>Notes</h2>
<p>This route covers roughly 800km by road. A private vehicle with a professional driver is essential — public transport cannot connect these points efficiently in 10 days. All Achari Tours itineraries include a dedicated driver-guide.</p>
    `.trim(),
    category: 'itineraries',
    categoryLabel: 'Itinerary Guides',
    coverImage: '/images/blog/blog-10-day-itinerary.jpg',
    publishedAt: '2024-10-10',
    readTime: 10,
    author: 'Achari Tours Team',
    tags: ['Itinerary', '10 Days', 'Planning', 'Classic Route', 'Cultural Triangle'],
    featured: false,
  },
]

// ─── Composable ───────────────────────────────────────────────────────────────

export function useBlog() {
  function getAllArticles(): BlogPost[] {
    return [...SEED_ARTICLES].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }

  function getFeaturedArticles(): BlogPost[] {
    return SEED_ARTICLES.filter((a) => a.featured)
  }

  function getArticlesByCategory(category: BlogCategory): BlogPost[] {
    return SEED_ARTICLES.filter((a) => a.category === category).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }

  function getArticleBySlug(slug: string): BlogPost | null {
    return SEED_ARTICLES.find((a) => a.slug === slug) ?? null
  }

  function getRelatedArticles(current: BlogPost, limit = 3): BlogPost[] {
    return SEED_ARTICLES.filter(
      (a) => a.slug !== current.slug && a.category === current.category
    )
      .concat(SEED_ARTICLES.filter((a) => a.slug !== current.slug && a.category !== current.category))
      .slice(0, limit)
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return {
    getAllArticles,
    getFeaturedArticles,
    getArticlesByCategory,
    getArticleBySlug,
    getRelatedArticles,
    formatDate,
    BLOG_CATEGORIES,
  }
}
