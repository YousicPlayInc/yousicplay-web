/**
 * Programmatic SEO landing pages data.
 *
 * Each page maps a long-tail keyword combination to one or more real courses.
 * Only combinations that have at least one matching course are generated.
 */

export interface SEOPage {
  slug: string;
  title: string;
  heading: string;
  description: string;
  instrument?: string;
  genre?: string;
  skill?: string;
  level?: string;
  relatedCourses: string[]; // course slugs
}

// ---------------------------------------------------------------------------
// Course-slug lookup helpers (kept in sync with src/data/courses.ts)
// ---------------------------------------------------------------------------

const PIANO_COURSES = [
  "cory-henry-workshop",
  "alain-merville",
  "jesus-molina-workshop",
  "jordan-rudess",
  "shedrick-mitchell",
  "jesus-molina-class",
  "noel-schajris",
  "cory-henry-organ-synth",
  "jesus-molina-arranging",
];

const GUITAR_COURSES = ["eric-gales-2"];
const VIOLIN_COURSES = ["lindsey-stirling"];
const DRUMS_COURSES = ["robert-sput-searight"];
const BASS_COURSES = ["andrew-gouche"];
const SINGING_COURSES = ["myron-butler", "chrisette-michele", "jax"];
const TRUMPET_COURSES = ["arturo-sandoval"];

const GOSPEL_COURSES = ["alain-merville", "myron-butler", "cory-henry-organ-synth"];
const JAZZ_COURSES = [
  "jesus-molina-class",
  "arturo-sandoval",
  "cory-henry-organ-synth",
  "jesus-molina-arranging",
];
const BLUES_COURSES = ["eric-gales-2"];
const LATIN_COURSES = ["noel-schajris", "arturo-sandoval", "jesus-molina-workshop"];
const RNB_SOUL_COURSES = ["chrisette-michele", "shedrick-mitchell", "cory-henry-workshop"];
const ROCK_COURSES = ["jordan-rudess", "eric-gales-2"];
const FUNK_COURSES = ["cory-henry-workshop", "robert-sput-searight", "andrew-gouche"];
const POP_COURSES = ["jax", "lindsey-stirling"];
const CLASSICAL_COURSES = ["lindsey-stirling", "arturo-sandoval"];

const IMPROV_COURSES = [
  "cory-henry-workshop",
  "jesus-molina-class",
  "arturo-sandoval",
  "jordan-rudess",
];
const CHORD_COURSES = [
  "alain-merville",
  "jesus-molina-workshop",
  "cory-henry-workshop",
  "noel-schajris",
];
const SOLOING_COURSES = ["cory-henry-workshop", "eric-gales-2", "arturo-sandoval"];
const ARRANGING_COURSES = ["jesus-molina-arranging", "jesus-molina-workshop", "lindsey-stirling"];
const TECHNIQUE_COURSES = [
  "jordan-rudess",
  "eric-gales-2",
  "arturo-sandoval",
  "andrew-gouche",
];
const SONGWRITING_COURSES = ["jax", "noel-schajris"];
const EAR_TRAINING_COURSES = ["jesus-molina-workshop", "alain-merville"];
const PERFORMANCE_COURSES = [
  "shedrick-mitchell",
  "lindsey-stirling",
  "arturo-sandoval",
  "chrisette-michele",
];

// ---------------------------------------------------------------------------
// Helper to deduplicate and intersect arrays
// ---------------------------------------------------------------------------

function intersect(a: string[], b: string[]): string[] {
  const set = new Set(a);
  return b.filter((s) => set.has(s));
}

function unique(...arrays: string[][]): string[] {
  return [...new Set(arrays.flat())];
}

// ---------------------------------------------------------------------------
// Page definitions
// ---------------------------------------------------------------------------

export const seoPages: SEOPage[] = [
  // ========================================================================
  // INSTRUMENT PAGES (broad)
  // ========================================================================
  {
    slug: "learn-piano-online",
    title: "Learn Piano Online | YousicPlay",
    heading: "Learn Piano Online from World-Class Musicians",
    description:
      "Master piano with celebrity-taught online courses. Learn from Grammy winners like Cory Henry, Jordan Rudess, and more. Beginner to advanced.",
    instrument: "Piano",
    relatedCourses: PIANO_COURSES,
  },
  {
    slug: "learn-guitar-online",
    title: "Learn Guitar Online | YousicPlay",
    heading: "Learn Guitar Online with Legendary Instructors",
    description:
      "Master guitar with step-by-step online courses from blues legend Eric Gales. Build real skills with structured video lessons.",
    instrument: "Guitar",
    relatedCourses: GUITAR_COURSES,
  },
  {
    slug: "learn-violin-online",
    title: "Learn Violin Online | YousicPlay",
    heading: "Learn Violin Online with Lindsey Stirling",
    description:
      "Master violin performance and creative arranging from multi-platinum artist Lindsey Stirling. Blend classical technique with modern styles.",
    instrument: "Violin",
    relatedCourses: VIOLIN_COURSES,
  },
  {
    slug: "learn-drums-online",
    title: "Learn Drums Online | YousicPlay",
    heading: "Learn Drums Online from a Grammy-Winning Drummer",
    description:
      "Master drums and musical expression with Robert 'Sput' Searight of Snarky Puppy. Build groove, dynamics, and creativity.",
    instrument: "Drums",
    relatedCourses: DRUMS_COURSES,
  },
  {
    slug: "learn-bass-guitar-online",
    title: "Learn Bass Guitar Online | YousicPlay",
    heading: "Learn Bass Guitar Online with a Legendary Bassist",
    description:
      "Master bass guitar technique and groove with Andrew Gouche. Learn to support a band, create bass lines, and play in multiple genres.",
    instrument: "Bass Guitar",
    relatedCourses: BASS_COURSES,
  },
  {
    slug: "learn-singing-online",
    title: "Learn Singing Online | YousicPlay",
    heading: "Learn Singing Online from Grammy-Winning Vocalists",
    description:
      "Develop your singing voice with lessons from Grammy winners. Courses in gospel, R&B, soul, and songwriting for all levels.",
    instrument: "Singing",
    relatedCourses: SINGING_COURSES,
  },
  {
    slug: "learn-trumpet-online",
    title: "Learn Trumpet Online | YousicPlay",
    heading: "Learn Trumpet Online with Arturo Sandoval",
    description:
      "Master trumpet performance with 10-time Grammy winner Arturo Sandoval. Learn tone production, jazz phrasing, and Latin jazz styles.",
    instrument: "Trumpet",
    relatedCourses: TRUMPET_COURSES,
  },
  {
    slug: "online-keyboard-lessons",
    title: "Online Keyboard Lessons | YousicPlay",
    heading: "Online Keyboard Lessons from Grammy Winners",
    description:
      "Take online keyboard lessons from Cory Henry, Jordan Rudess, and more. Learn organ, synth, and piano techniques in structured video courses.",
    instrument: "Piano",
    relatedCourses: [...PIANO_COURSES],
  },
  {
    slug: "learn-organ-online",
    title: "Learn Organ Online | YousicPlay",
    heading: "Learn Organ Online with Cory Henry",
    description:
      "Master Hammond organ technique, drawbar settings, and gospel organ style with Grammy-winning keyboardist Cory Henry.",
    instrument: "Organ",
    relatedCourses: ["cory-henry-organ-synth", "cory-henry-workshop"],
  },
  {
    slug: "learn-synth-online",
    title: "Learn Synth Online | YousicPlay",
    heading: "Learn Synth Programming and Performance Online",
    description:
      "Master synthesizer programming and performance with Cory Henry and Jordan Rudess. Create unique electronic sounds and textures.",
    instrument: "Synth",
    relatedCourses: ["cory-henry-organ-synth", "jordan-rudess"],
  },

  // ========================================================================
  // GENRE PAGES (broad)
  // ========================================================================
  {
    slug: "gospel-music-lessons",
    title: "Gospel Music Lessons Online | YousicPlay",
    heading: "Gospel Music Lessons from World-Class Artists",
    description:
      "Learn gospel music online with courses in gospel piano, gospel singing, and gospel organ from Berklee professors and Grammy winners.",
    genre: "Gospel",
    relatedCourses: GOSPEL_COURSES,
  },
  {
    slug: "jazz-music-lessons",
    title: "Jazz Music Lessons Online | YousicPlay",
    heading: "Jazz Music Lessons from Legendary Musicians",
    description:
      "Master jazz with online courses covering improvisation, jazz piano, jazz trumpet, and arranging. Learn from Grammy-winning artists.",
    genre: "Jazz",
    relatedCourses: JAZZ_COURSES,
  },
  {
    slug: "blues-music-lessons",
    title: "Blues Music Lessons Online | YousicPlay",
    heading: "Blues Music Lessons with Eric Gales",
    description:
      "Learn blues guitar from one of the most acclaimed guitarists of our generation. Master blues riffs, pentatonic scales, and soloing.",
    genre: "Blues",
    relatedCourses: BLUES_COURSES,
  },
  {
    slug: "latin-music-lessons",
    title: "Latin Music Lessons Online | YousicPlay",
    heading: "Latin Music Lessons from Grammy-Winning Artists",
    description:
      "Master Latin music with courses covering Latin piano, Latin jazz trumpet, and Latin songwriting from award-winning artists.",
    genre: "Latin",
    relatedCourses: LATIN_COURSES,
  },
  {
    slug: "rnb-music-lessons",
    title: "R&B Music Lessons Online | YousicPlay",
    heading: "R&B Music Lessons from Grammy Winners",
    description:
      "Learn R&B singing, soulful piano, and performance techniques from Grammy-winning artists like Chrisette Michele.",
    genre: "R&B",
    relatedCourses: RNB_SOUL_COURSES,
  },
  {
    slug: "rock-music-lessons",
    title: "Rock Music Lessons Online | YousicPlay",
    heading: "Rock Music Lessons from Legendary Performers",
    description:
      "Master rock keyboard with Dream Theater's Jordan Rudess and blues-rock guitar with Eric Gales. Structured online video courses.",
    genre: "Rock",
    relatedCourses: ROCK_COURSES,
  },

  // ========================================================================
  // INSTRUMENT + GENRE COMBINATIONS
  // ========================================================================
  {
    slug: "gospel-piano-lessons",
    title: "Gospel Piano Lessons Online | YousicPlay",
    heading: "Master Gospel Piano with a Berklee Professor",
    description:
      "Learn gospel piano techniques, chord progressions, and worship playing from Berklee professor Alain Merville. Online video course with lifetime access.",
    instrument: "Piano",
    genre: "Gospel",
    relatedCourses: intersect(PIANO_COURSES, GOSPEL_COURSES),
  },
  {
    slug: "learn-gospel-piano-online",
    title: "Learn Gospel Piano Online | YousicPlay",
    heading: "Learn Gospel Piano Online Step by Step",
    description:
      "Master gospel piano harmony, runs, fills, and worship techniques with structured online lessons from a Berklee professor.",
    instrument: "Piano",
    genre: "Gospel",
    relatedCourses: intersect(PIANO_COURSES, GOSPEL_COURSES),
  },
  {
    slug: "jazz-piano-lessons",
    title: "Jazz Piano Lessons Online | YousicPlay",
    heading: "Master Jazz Piano with World-Renowned Musicians",
    description:
      "Learn jazz improvisation, comping, and jazz harmony from Jes\u00fas Molina. Online jazz piano course with lifetime access.",
    instrument: "Piano",
    genre: "Jazz",
    relatedCourses: intersect(PIANO_COURSES, JAZZ_COURSES),
  },
  {
    slug: "learn-jazz-piano-online",
    title: "Learn Jazz Piano Online | YousicPlay",
    heading: "Learn Jazz Piano Online from a World-Class Pianist",
    description:
      "Master jazz piano improvisation, ii-V-I progressions, and jazz voicings with structured video lessons from Jes\u00fas Molina.",
    instrument: "Piano",
    genre: "Jazz",
    relatedCourses: intersect(PIANO_COURSES, JAZZ_COURSES),
  },
  {
    slug: "blues-guitar-lessons",
    title: "Blues Guitar Lessons Online | YousicPlay",
    heading: "Master Blues Guitar with Eric Gales",
    description:
      "Learn blues guitar from a guitarist praised by Carlos Santana. Master pentatonic scales, blues riffs, and soloing techniques.",
    instrument: "Guitar",
    genre: "Blues",
    relatedCourses: intersect(GUITAR_COURSES, BLUES_COURSES),
  },
  {
    slug: "learn-blues-guitar-online",
    title: "Learn Blues Guitar Online | YousicPlay",
    heading: "Learn Blues Guitar Online Step by Step",
    description:
      "Master blues guitar with Eric Gales. 16 focused lessons covering riffs, scales, soloing, and performance. Lifetime access.",
    instrument: "Guitar",
    genre: "Blues",
    relatedCourses: intersect(GUITAR_COURSES, BLUES_COURSES),
  },
  {
    slug: "latin-piano-lessons",
    title: "Latin Piano Lessons Online | YousicPlay",
    heading: "Master Latin Piano Rhythms and Techniques",
    description:
      "Learn Latin piano rhythms, harmonies, and songwriting from Grammy-winning artist Noel Schajris. Structured online course.",
    instrument: "Piano",
    genre: "Latin",
    relatedCourses: intersect(PIANO_COURSES, LATIN_COURSES),
  },
  {
    slug: "jazz-trumpet-lessons",
    title: "Jazz Trumpet Lessons Online | YousicPlay",
    heading: "Master Jazz Trumpet with Arturo Sandoval",
    description:
      "Learn jazz trumpet from 10-time Grammy winner Arturo Sandoval. Master tone, phrasing, improvisation, and Latin jazz styles.",
    instrument: "Trumpet",
    genre: "Jazz",
    relatedCourses: ["arturo-sandoval"],
  },
  {
    slug: "latin-jazz-trumpet-lessons",
    title: "Latin Jazz Trumpet Lessons | YousicPlay",
    heading: "Master Latin Jazz Trumpet with Arturo Sandoval",
    description:
      "Learn Latin jazz trumpet styles from 10-time Grammy winner and Presidential Medal of Freedom recipient Arturo Sandoval.",
    instrument: "Trumpet",
    genre: "Latin",
    relatedCourses: ["arturo-sandoval"],
  },
  {
    slug: "gospel-singing-lessons",
    title: "Gospel Singing Lessons Online | YousicPlay",
    heading: "Master Gospel Singing with Grammy Winner Myron Butler",
    description:
      "Learn gospel vocal technique, harmony, worship leading, and performance from Grammy Award-winning gospel artist Myron Butler.",
    instrument: "Singing",
    genre: "Gospel",
    relatedCourses: ["myron-butler"],
  },
  {
    slug: "rnb-singing-lessons",
    title: "R&B Singing Lessons Online | YousicPlay",
    heading: "Master R&B Singing with Chrisette Michele",
    description:
      "Learn soulful singing, vocal runs, and R&B technique from Grammy Award-winning artist Chrisette Michele. Online course with lifetime access.",
    instrument: "Singing",
    genre: "R&B",
    relatedCourses: ["chrisette-michele"],
  },
  {
    slug: "gospel-organ-lessons",
    title: "Gospel Organ Lessons Online | YousicPlay",
    heading: "Master Gospel Organ with Cory Henry",
    description:
      "Learn gospel organ techniques, Hammond drawbar settings, and worship keyboard styles with Grammy-winning keyboardist Cory Henry.",
    instrument: "Organ",
    genre: "Gospel",
    relatedCourses: ["cory-henry-organ-synth"],
  },
  {
    slug: "rock-keyboard-lessons",
    title: "Rock Keyboard Lessons Online | YousicPlay",
    heading: "Master Rock Keyboard with Jordan Rudess",
    description:
      "Learn rock piano and synth techniques from Dream Theater's legendary keyboardist Jordan Rudess. Speed, power, and expression.",
    instrument: "Piano",
    genre: "Rock",
    relatedCourses: ["jordan-rudess"],
  },
  {
    slug: "funk-drums-lessons",
    title: "Funk Drums Lessons Online | YousicPlay",
    heading: "Master Funk Drumming with Sput Searight",
    description:
      "Learn funk drumming, groove, and musical expression from Grammy-winning Snarky Puppy drummer Robert 'Sput' Searight.",
    instrument: "Drums",
    genre: "Funk",
    relatedCourses: ["robert-sput-searight"],
  },
  {
    slug: "funk-bass-lessons",
    title: "Funk Bass Lessons Online | YousicPlay",
    heading: "Master Funk Bass Guitar with Andrew Gouche",
    description:
      "Learn funk bass techniques, slap bass, and groove from legendary bassist Andrew Gouche. Online course with lifetime access.",
    instrument: "Bass Guitar",
    genre: "Funk",
    relatedCourses: ["andrew-gouche"],
  },
  {
    slug: "classical-violin-lessons",
    title: "Classical Violin Lessons Online | YousicPlay",
    heading: "Master Violin with Lindsey Stirling",
    description:
      "Learn violin fundamentals, bowing technique, and creative arranging from multi-platinum artist Lindsey Stirling.",
    instrument: "Violin",
    genre: "Classical",
    relatedCourses: ["lindsey-stirling"],
  },

  // ========================================================================
  // SKILL PAGES
  // ========================================================================
  {
    slug: "music-improvisation-lessons",
    title: "Music Improvisation Lessons Online | YousicPlay",
    heading: "Master Music Improvisation with Grammy Winners",
    description:
      "Learn improvisation techniques from Cory Henry, Jes\u00fas Molina, Arturo Sandoval, and Jordan Rudess. Piano, trumpet, and keyboard courses.",
    skill: "Improvisation",
    relatedCourses: IMPROV_COURSES,
  },
  {
    slug: "piano-improvisation-lessons",
    title: "Piano Improvisation Lessons Online | YousicPlay",
    heading: "Master Piano Improvisation Step by Step",
    description:
      "Learn piano improvisation from Grammy winners. Master soloing, jazz improv, and creative freedom at the keyboard.",
    instrument: "Piano",
    skill: "Improvisation",
    relatedCourses: intersect(PIANO_COURSES, IMPROV_COURSES),
  },
  {
    slug: "jazz-improvisation-lessons",
    title: "Jazz Improvisation Lessons Online | YousicPlay",
    heading: "Master Jazz Improvisation Techniques",
    description:
      "Learn jazz improvisation from world-class musicians. Master ii-V-I progressions, scale selection, and solo development.",
    genre: "Jazz",
    skill: "Improvisation",
    relatedCourses: intersect(JAZZ_COURSES, IMPROV_COURSES),
  },
  {
    slug: "learn-chord-progressions",
    title: "Learn Chord Progressions Online | YousicPlay",
    heading: "Master Chord Progressions with Expert Guidance",
    description:
      "Learn chord progressions, voicings, and harmonic techniques from Berklee professors and Grammy-winning musicians.",
    skill: "Chord Progressions",
    relatedCourses: CHORD_COURSES,
  },
  {
    slug: "gospel-chord-progressions",
    title: "Gospel Chord Progressions Course | YousicPlay",
    heading: "Master Gospel Chord Progressions",
    description:
      "Learn gospel chord progressions, voice leading, and harmony from Berklee professor Alain Merville. Step-by-step online course.",
    genre: "Gospel",
    skill: "Chord Progressions",
    relatedCourses: intersect(GOSPEL_COURSES, CHORD_COURSES),
  },
  {
    slug: "piano-chord-voicings",
    title: "Piano Chord Voicings Course | YousicPlay",
    heading: "Master Piano Chord Voicings and Harmony",
    description:
      "Learn professional chord voicings for piano from Grammy-winning musicians. Gospel, jazz, and Latin voicing techniques.",
    instrument: "Piano",
    skill: "Chord Progressions",
    relatedCourses: CHORD_COURSES,
  },
  {
    slug: "music-soloing-techniques",
    title: "Soloing Techniques Course | YousicPlay",
    heading: "Master Soloing Techniques from Grammy Winners",
    description:
      "Learn soloing techniques for piano, guitar, and trumpet from Cory Henry, Eric Gales, and Arturo Sandoval.",
    skill: "Soloing",
    relatedCourses: SOLOING_COURSES,
  },
  {
    slug: "piano-soloing-course",
    title: "Piano Soloing Course Online | YousicPlay",
    heading: "Master Piano Soloing with Cory Henry",
    description:
      "Learn to play professional piano solos with Grammy-winning keyboardist Cory Henry. Melodic lines, embellishments, and solo structure.",
    instrument: "Piano",
    skill: "Soloing",
    relatedCourses: ["cory-henry-workshop"],
  },
  {
    slug: "guitar-soloing-course",
    title: "Guitar Soloing Course Online | YousicPlay",
    heading: "Master Guitar Soloing with Eric Gales",
    description:
      "Learn guitar soloing techniques from blues legend Eric Gales. Pentatonic scales, blues riffs, and performance skills.",
    instrument: "Guitar",
    skill: "Soloing",
    relatedCourses: ["eric-gales-2"],
  },
  {
    slug: "music-arranging-lessons",
    title: "Music Arranging Lessons Online | YousicPlay",
    heading: "Master Music Arranging with World-Class Musicians",
    description:
      "Learn professional arranging techniques from Jes\u00fas Molina and Lindsey Stirling. Reharmonization, voice leading, and creative arranging.",
    skill: "Arranging",
    relatedCourses: ARRANGING_COURSES,
  },
  {
    slug: "piano-arranging-course",
    title: "Piano Arranging Course Online | YousicPlay",
    heading: "Master Piano Arranging with Jes\u00fas Molina",
    description:
      "Learn a complete piano arranging framework from celebrity musician Jes\u00fas Molina. Practical exercises and professional techniques.",
    instrument: "Piano",
    skill: "Arranging",
    relatedCourses: ["jesus-molina-arranging", "jesus-molina-workshop"],
  },
  {
    slug: "songwriting-lessons-online",
    title: "Songwriting Lessons Online | YousicPlay",
    heading: "Learn Songwriting from Hit-Making Artists",
    description:
      "Master songwriting with courses from Jax (American Idol) and Noel Schajris (Grammy winner). Melody, lyrics, and song structure.",
    skill: "Songwriting",
    relatedCourses: SONGWRITING_COURSES,
  },
  {
    slug: "ear-training-course",
    title: "Ear Training Course Online | YousicPlay",
    heading: "Develop Your Musical Ear with Expert Training",
    description:
      "Learn to play by ear with courses from Jes\u00fas Molina and Alain Merville. Identify chords, melodies, and progressions by ear.",
    skill: "Ear Training",
    relatedCourses: EAR_TRAINING_COURSES,
  },
  {
    slug: "music-performance-course",
    title: "Music Performance Course Online | YousicPlay",
    heading: "Master Music Performance and Stage Presence",
    description:
      "Learn professional performance skills from artists who've worked with Whitney Houston, Andrea Bocelli, and more.",
    skill: "Performance",
    relatedCourses: PERFORMANCE_COURSES,
  },

  // ========================================================================
  // INSTRUMENT + SKILL COMBINATIONS
  // ========================================================================
  {
    slug: "piano-technique-lessons",
    title: "Piano Technique Lessons Online | YousicPlay",
    heading: "Master Piano Technique from World-Class Pianists",
    description:
      "Improve your piano technique with courses from Jordan Rudess, Cory Henry, and Jes\u00fas Molina. Speed, voicings, and expression.",
    instrument: "Piano",
    skill: "Technique",
    relatedCourses: intersect(PIANO_COURSES, TECHNIQUE_COURSES),
  },
  {
    slug: "guitar-technique-lessons",
    title: "Guitar Technique Lessons Online | YousicPlay",
    heading: "Master Guitar Technique with Eric Gales",
    description:
      "Improve your guitar technique with blues legend Eric Gales. Picking patterns, posture, warm-ups, and pentatonic mastery.",
    instrument: "Guitar",
    skill: "Technique",
    relatedCourses: ["eric-gales-2"],
  },
  {
    slug: "trumpet-improvisation-lessons",
    title: "Trumpet Improvisation Lessons | YousicPlay",
    heading: "Master Trumpet Improvisation with Arturo Sandoval",
    description:
      "Learn trumpet improvisation from 10-time Grammy winner Arturo Sandoval. Jazz phrasing, bebop vocabulary, and musical storytelling.",
    instrument: "Trumpet",
    skill: "Improvisation",
    relatedCourses: ["arturo-sandoval"],
  },
  {
    slug: "vocal-technique-course",
    title: "Vocal Technique Course Online | YousicPlay",
    heading: "Master Vocal Technique from Grammy Winners",
    description:
      "Develop professional vocal technique with courses from Myron Butler and Chrisette Michele. Breath control, runs, and expression.",
    instrument: "Singing",
    skill: "Technique",
    relatedCourses: ["myron-butler", "chrisette-michele"],
  },
  {
    slug: "bass-technique-lessons",
    title: "Bass Guitar Technique Lessons | YousicPlay",
    heading: "Master Bass Guitar Technique with Andrew Gouche",
    description:
      "Learn bass guitar technique from legendary bassist Andrew Gouche. Groove, slap bass, and creating original bass lines.",
    instrument: "Bass Guitar",
    skill: "Technique",
    relatedCourses: ["andrew-gouche"],
  },
  {
    slug: "drum-groove-lessons",
    title: "Drum Groove Lessons Online | YousicPlay",
    heading: "Master Drum Grooves with Sput Searight",
    description:
      "Learn groove, dynamics, and musical drumming from Grammy-winning Snarky Puppy drummer Robert 'Sput' Searight.",
    instrument: "Drums",
    skill: "Groove",
    relatedCourses: ["robert-sput-searight"],
  },

  // ========================================================================
  // LEVEL-BASED PAGES
  // ========================================================================
  {
    slug: "beginner-piano-lessons",
    title: "Beginner Piano Lessons Online | YousicPlay",
    heading: "Beginner Piano Lessons from Celebrity Musicians",
    description:
      "Start your piano journey with beginner-friendly courses from Jes\u00fas Molina. Learn to play by ear and arrange songs with basic skills.",
    instrument: "Piano",
    level: "Beginner",
    relatedCourses: ["jesus-molina-workshop"],
  },
  {
    slug: "beginner-guitar-lessons",
    title: "Beginner Guitar Lessons Online | YousicPlay",
    heading: "Start Learning Guitar with a Blues Legend",
    description:
      "Begin your guitar journey with Eric Gales. Learn blues fundamentals, picking patterns, and pentatonic scales step by step.",
    instrument: "Guitar",
    level: "Beginner",
    relatedCourses: ["eric-gales-2"],
  },
  {
    slug: "beginner-violin-lessons",
    title: "Beginner Violin Lessons Online | YousicPlay",
    heading: "Start Learning Violin with Lindsey Stirling",
    description:
      "Begin your violin journey with multi-platinum artist Lindsey Stirling. Fundamentals, bowing, tone, and expression.",
    instrument: "Violin",
    level: "Beginner",
    relatedCourses: ["lindsey-stirling"],
  },
  {
    slug: "beginner-singing-lessons",
    title: "Beginner Singing Lessons Online | YousicPlay",
    heading: "Start Singing with Grammy-Winning Vocalists",
    description:
      "Begin your singing journey with beginner-friendly courses from Myron Butler, Chrisette Michele, and Jax.",
    instrument: "Singing",
    level: "Beginner",
    relatedCourses: SINGING_COURSES,
  },
  {
    slug: "beginner-drums-lessons",
    title: "Beginner Drums Lessons Online | YousicPlay",
    heading: "Start Learning Drums with Sput Searight",
    description:
      "Begin drumming with Grammy-winning drummer Robert 'Sput' Searight. Fundamentals, groove, and musical expression.",
    instrument: "Drums",
    level: "Beginner",
    relatedCourses: ["robert-sput-searight"],
  },
  {
    slug: "advanced-piano-lessons",
    title: "Advanced Piano Lessons Online | YousicPlay",
    heading: "Advanced Piano Courses for Serious Musicians",
    description:
      "Take your piano skills to the next level with advanced courses in soloing, jazz improv, arranging, and organ technique.",
    instrument: "Piano",
    level: "Advanced",
    relatedCourses: [
      "cory-henry-workshop",
      "jesus-molina-class",
      "jesus-molina-arranging",
      "jordan-rudess",
      "cory-henry-organ-synth",
    ],
  },

  // ========================================================================
  // FORMAT / INTENT VARIATIONS
  // ========================================================================
  {
    slug: "online-music-courses",
    title: "Online Music Courses | YousicPlay",
    heading: "Online Music Courses from Grammy-Winning Artists",
    description:
      "Learn music online from celebrity instructors. Courses in piano, guitar, violin, drums, bass, trumpet, and singing. Lifetime access.",
    relatedCourses: unique(PIANO_COURSES, GUITAR_COURSES, VIOLIN_COURSES, TRUMPET_COURSES),
  },
  {
    slug: "music-lessons-for-adults",
    title: "Music Lessons for Adults Online | YousicPlay",
    heading: "Music Lessons Designed for Adult Learners",
    description:
      "Learn music at your own pace with online courses designed for adults. Piano, guitar, singing, and more from celebrity instructors.",
    relatedCourses: unique(PIANO_COURSES, GUITAR_COURSES, SINGING_COURSES),
  },
  {
    slug: "learn-music-from-celebrities",
    title: "Learn Music from Celebrity Musicians | YousicPlay",
    heading: "Learn Music from the World's Best Musicians",
    description:
      "Take music lessons from Grammy winners, platinum artists, and Berklee professors. Piano, guitar, violin, trumpet, and more.",
    relatedCourses: unique(
      ["cory-henry-workshop", "arturo-sandoval", "lindsey-stirling", "eric-gales-2"],
      ["jordan-rudess", "chrisette-michele", "myron-butler", "noel-schajris"]
    ),
  },
  {
    slug: "how-to-play-piano",
    title: "How to Play Piano | Online Course | YousicPlay",
    heading: "How to Play Piano: Learn from the Best",
    description:
      "Learn how to play piano with step-by-step online courses from Grammy winners and Berklee professors. All levels welcome.",
    instrument: "Piano",
    relatedCourses: PIANO_COURSES,
  },
  {
    slug: "how-to-play-guitar",
    title: "How to Play Guitar | Online Course | YousicPlay",
    heading: "How to Play Guitar: Learn Blues Guitar Online",
    description:
      "Learn how to play guitar with blues legend Eric Gales. Step-by-step video lessons covering technique, riffs, and soloing.",
    instrument: "Guitar",
    relatedCourses: GUITAR_COURSES,
  },
  {
    slug: "how-to-sing-better",
    title: "How to Sing Better | Online Course | YousicPlay",
    heading: "How to Sing Better: Vocal Training from Grammy Winners",
    description:
      "Improve your singing with courses from Grammy-winning vocalists. Gospel, R&B, and songwriting techniques for all levels.",
    instrument: "Singing",
    relatedCourses: SINGING_COURSES,
  },
  {
    slug: "how-to-improvise-on-piano",
    title: "How to Improvise on Piano | YousicPlay",
    heading: "How to Improvise on Piano: A Complete Guide",
    description:
      "Learn piano improvisation with courses from Cory Henry and Jes\u00fas Molina. Soloing, jazz improv, and creative playing techniques.",
    instrument: "Piano",
    skill: "Improvisation",
    relatedCourses: intersect(PIANO_COURSES, IMPROV_COURSES),
  },
  {
    slug: "how-to-play-blues-guitar",
    title: "How to Play Blues Guitar | YousicPlay",
    heading: "How to Play Blues Guitar Step by Step",
    description:
      "Learn blues guitar from Eric Gales. Pentatonic scales, blues riffs, ghost notes, and soloing techniques in structured lessons.",
    instrument: "Guitar",
    genre: "Blues",
    relatedCourses: ["eric-gales-2"],
  },

  // ========================================================================
  // INSTRUCTOR-FOCUSED PAGES
  // ========================================================================
  {
    slug: "cory-henry-piano-course",
    title: "Cory Henry Piano Course | YousicPlay",
    heading: "Learn Piano and Keyboards from Cory Henry",
    description:
      "Take online courses with Grammy-winning keyboardist Cory Henry. Soloing, organ technique, synth programming, and more.",
    relatedCourses: ["cory-henry-workshop", "cory-henry-organ-synth"],
  },
  {
    slug: "jesus-molina-piano-course",
    title: "Jes\u00fas Molina Piano Course | YousicPlay",
    heading: "Learn Piano from Jes\u00fas Molina",
    description:
      "Take online piano courses with world-renowned pianist Jes\u00fas Molina. Jazz improvisation, arranging, and playing by ear.",
    relatedCourses: ["jesus-molina-class", "jesus-molina-workshop", "jesus-molina-arranging"],
  },
  {
    slug: "learn-piano-by-ear",
    title: "Learn Piano by Ear Online | YousicPlay",
    heading: "Learn to Play Piano by Ear",
    description:
      "Master the art of playing piano by ear with Jes\u00fas Molina and Alain Merville. Identify chords, create arrangements, and play confidently.",
    instrument: "Piano",
    skill: "Ear Training",
    relatedCourses: intersect(PIANO_COURSES, EAR_TRAINING_COURSES),
  },
  {
    slug: "music-theory-course",
    title: "Music Theory Course Online | YousicPlay",
    heading: "Learn Music Theory Through Practical Application",
    description:
      "Learn music theory through practical courses from Grammy-winning musicians. Harmony, chord theory, and ear training applied to real music.",
    skill: "Music Theory",
    relatedCourses: unique(CHORD_COURSES, EAR_TRAINING_COURSES, JAZZ_COURSES),
  },
  {
    slug: "worship-piano-lessons",
    title: "Worship Piano Lessons Online | YousicPlay",
    heading: "Master Worship Piano from Expert Musicians",
    description:
      "Learn worship piano techniques, gospel harmony, and playing for church services with Berklee professor Alain Merville.",
    instrument: "Piano",
    genre: "Gospel",
    skill: "Performance",
    relatedCourses: ["alain-merville", "cory-henry-organ-synth"],
  },
  {
    slug: "slap-bass-lessons",
    title: "Slap Bass Lessons Online | YousicPlay",
    heading: "Master Slap Bass Technique with Andrew Gouche",
    description:
      "Learn slap bass fundamentals and advanced techniques from legendary bassist Andrew Gouche. Online course with lifetime access.",
    instrument: "Bass Guitar",
    skill: "Technique",
    relatedCourses: ["andrew-gouche"],
  },
  {
    slug: "hammond-organ-lessons",
    title: "Hammond Organ Lessons Online | YousicPlay",
    heading: "Master Hammond Organ with Cory Henry",
    description:
      "Learn Hammond organ technique, drawbar settings, Leslie speaker effects, and gospel organ style with Cory Henry.",
    instrument: "Organ",
    skill: "Technique",
    relatedCourses: ["cory-henry-organ-synth"],
  },
  {
    slug: "synth-programming-course",
    title: "Synth Programming Course Online | YousicPlay",
    heading: "Learn Synth Programming from Master Keyboardists",
    description:
      "Master synthesizer programming, sound design, and electronic textures with Cory Henry and Jordan Rudess.",
    instrument: "Synth",
    skill: "Technique",
    relatedCourses: ["cory-henry-organ-synth", "jordan-rudess"],
  },
  {
    slug: "piano-for-songwriters",
    title: "Piano for Songwriters | YousicPlay",
    heading: "Piano Skills for Songwriters and Creators",
    description:
      "Learn piano chord progressions, harmony, and arranging skills essential for songwriting. Courses from Noel Schajris and Jes\u00fas Molina.",
    instrument: "Piano",
    skill: "Songwriting",
    relatedCourses: intersect(PIANO_COURSES, SONGWRITING_COURSES),
  },
];
