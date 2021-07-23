//
//
//
//
export interface ContentMapElement
{
    cell: string // this is the title to be displayed in the cell
    descr?: string // this is a subtitle to be displayed in the cell
    source_url?: string // this is a URL at which to find the original hosting location 
    //
    // -one of the following-
    //
    html_id?: string // this is the html content for an actual leaf page 
    list_id?: string // this is the id of a list if the ContentMapElement is actually a parent to a child list
    url?: string, // this is a URL 
}
//
const htmls_by_id: { [key: string]: any } = 
{
    //
    // home
    "intro-from-publisher": require('../resources/specific/intro.html'),
    "message": require('../resources/enlightenment/top/message.html'),
    //
    // lectures / articles / teachings
    "subjects": require("../resources/enlightenment/lectures/subjects.html"),
    "karma": require("../resources/enlightenment/articles/karma.html"),
    "destiny": require("../resources/enlightenment/articles/destiny.html"),
    "life": require("../resources/enlightenment/articles/life.html"),
    "happiness_and_peace": require("../resources/enlightenment/articles/happiness_and_peace.html"),
    "messages": require("../resources/enlightenment/articles/messages.html"),
    "places": require("../resources/enlightenment/lectures/places.html"),
    "teaching": require("../resources/enlightenment/articles/teaching.html"),
    "way_of_enlightenment": require("../resources/enlightenment/lectures/way_of_enlightenment.html"),
    "world_of_life": require("../resources/enlightenment/lectures/world_of_life.html"),
    "human_being_and_god": require("../resources/enlightenment/lectures/human_being_and_god.html"),
    "earth": require("../resources/enlightenment/lectures/earth.html"),
    "11262006": require("../resources/enlightenment/teaching/11262006.html"),
    "12102006": require("../resources/enlightenment/teaching/12102006.html"),
    "12172006": require("../resources/enlightenment/teaching/12172006.html"),
    "12242006": require("../resources/enlightenment/teaching/12242006.html"),
    "02252007": require("../resources/enlightenment/teaching/02252007.html"),
    "03042007": require("../resources/enlightenment/teaching/03042007.html"),

    //
    // Q&A
    "q_a_disclaimer": require("../resources/specific/q_a_disclaimer.html"),
    //
    "steve": require("../resources/enlightenment/qa/steve.html"),
    "santosh": require("../resources/enlightenment/qa/santosh.html"),
    "marcello": require("../resources/enlightenment/qa/marcello.html"),
    "michael": require("../resources/enlightenment/qa/michael.html"),
    "jenny": require("../resources/enlightenment/qa/jenny.html"),
    "indrajit": require("../resources/enlightenment/qa/indrajit.html"),
    "peter": require("../resources/enlightenment/qa/peter.html"),
    "barbara": require("../resources/enlightenment/qa/barbara.html"),
    "vivian": require("../resources/enlightenment/qa/vivian.html"),
    "vanessa": require("../resources/enlightenment/qa/vanessa.html"),
    "nexarius": require("../resources/enlightenment/qa/nexarius.html"),
    "somnath": require("../resources/enlightenment/qa/somnath.html"),
    "pradeep": require("../resources/enlightenment/qa/pradeep.html"),
    "dave_cote": require("../resources/enlightenment/qa/dave_cote.html"),
    "karen_lonsdale": require("../resources/enlightenment/qa/karen_lonsdale.html"),
    "sean": require("../resources/enlightenment/qa/sean.html"),
    "cacohen": require("../resources/enlightenment/qa/cacohen.html"),
    "shailendra": require("../resources/enlightenment/qa/shailendra.html"),
    "tom": require("../resources/enlightenment/qa/tom.html"),
    "cindy": require("../resources/enlightenment/qa/cindy.html"),
    "r_kondur": require("../resources/enlightenment/qa/r_kondur.html"),
    "ying": require("../resources/enlightenment/qa/ying.html"),
    "jan": require("../resources/enlightenment/qa/jan.html"),
    "steve2": require("../resources/enlightenment/qa/steve2.html"),
    "edward": require("../resources/enlightenment/qa/edward.html"),
    "wadine": require("../resources/enlightenment/qa/wadine.html"),
    "pol_shappy": require("../resources/enlightenment/qa/pol_shappy.html"),
    "john": require("../resources/enlightenment/qa/john.html"),
    "richard": require("../resources/enlightenment/qa/richard.html"),
    "neil": require("../resources/enlightenment/qa/neil.html"),
    "robert": require("../resources/enlightenment/qa/robert.html"),
    "bryan": require("../resources/enlightenment/qa/bryan.html"),
    "bob": require("../resources/enlightenment/qa/bob.html"),
    "sandhya": require("../resources/enlightenment/qa/sandhya.html"),
    "stanely": require("../resources/enlightenment/qa/stanely.html"),
    "craig": require("../resources/enlightenment/qa/craig.html"),
    "shaun": require("../resources/enlightenment/qa/shaun.html"),
    "rani": require("../resources/enlightenment/qa/rani.html"),
    "leon": require("../resources/enlightenment/qa/leon.html"),
    "bruce": require("../resources/enlightenment/qa/bruce.html"),
    "dan": require("../resources/enlightenment/qa/dan.html"),
    "rs_champagne": require("../resources/enlightenment/qa/rs_champagne.html"),
    "kongkc": require("../resources/enlightenment/qa/kongkc.html"),
    "matt_hewitt": require("../resources/enlightenment/qa/matt_hewitt.html"),
    "jvanaardt": require("../resources/enlightenment/qa/jvanaardt.html"),
    "keith": require("../resources/enlightenment/qa/keith.html"),
    "steve3": require("../resources/enlightenment/qa/steve3.html"),
    "toto": require("../resources/enlightenment/qa/toto.html"),
    "ing": require("../resources/enlightenment/qa/ing.html"),
    "ishaqui": require("../resources/enlightenment/qa/ishaqui.html"),
    "marios": require("../resources/enlightenment/qa/marios.html"),
    "nitin": require("../resources/enlightenment/qa/nitin.html"),
    "christopher_sambo": require("../resources/enlightenment/qa/christopher_sambo.html"),
    "michael80": require("../resources/enlightenment/qa/michael80.html"),
    "joe": require("../resources/enlightenment/qa/joe.html"),
    "jk": require("../resources/enlightenment/qa/jk.html"),
    "james_ling": require("../resources/enlightenment/qa/james_ling.html"),
    "lrl_gupta": require("../resources/enlightenment/qa/lrl_gupta.html"),
    "george_k": require("../resources/enlightenment/qa/george_k.html"),
    "leo": require("../resources/enlightenment/qa/leo.html"),
    "anele": require("../resources/enlightenment/qa/anele.html"),
    "zihao": require("../resources/enlightenment/qa/zihao.html"),
    "simon": require("../resources/enlightenment/qa/simon.html"),
    "gordon": require("../resources/enlightenment/qa/gordon.html"),
    "cherry": require("../resources/enlightenment/qa/cherry.html"),
    "mir_mehmood": require("../resources/enlightenment/qa/mir_mehmood.html"),
    "henry": require("../resources/enlightenment/qa/henry.html"),
    "ron": require("../resources/enlightenment/qa/ron.html"),
    "kim": require("../resources/enlightenment/qa/kim.html"),
    "jerry": require("../resources/enlightenment/qa/jerry.html"),
    "vinod": require("../resources/enlightenment/qa/vinod.html"),
    "cri": require("../resources/enlightenment/qa/cri.html"),
    "ap": require("../resources/enlightenment/qa/ap.html"),
    "kyle": require("../resources/enlightenment/qa/kyle.html"),
    "peterae": require("../resources/enlightenment/qa/peterae.html"),
    "charan_singh": require("../resources/enlightenment/qa/charan_singh.html"),
    "clay": require("../resources/enlightenment/qa/clay.html"),
    "ingmar": require("../resources/enlightenment/qa/ingmar.html"),
    "pamela": require("../resources/enlightenment/qa/pamela.html"),
    "xi": require("../resources/enlightenment/qa/xi.html"),
    "brenda": require("../resources/enlightenment/qa/brenda.html"),
    "v": require("../resources/enlightenment/qa/v.html"),
    "karloze": require("../resources/enlightenment/qa/karloze.html"),
    "seanb6": require("../resources/enlightenment/qa/seanb6.html"),
    "swp": require("../resources/enlightenment/qa/swp.html"),
    "pravin": require("../resources/enlightenment/qa/pravin.html"),
    "frank": require("../resources/enlightenment/qa/frank.html"),
    "indu": require("../resources/enlightenment/qa/indu.html"),
    "joyce": require("../resources/enlightenment/qa/joyce.html"),
    "lk": require("../resources/enlightenment/qa/lk.html"),
    "d": require("../resources/enlightenment/qa/d.html"),
    "daniel": require("../resources/enlightenment/qa/daniel.html"),
    "mark": require("../resources/enlightenment/qa/mark.html"),
    "fatos": require("../resources/enlightenment/qa/fatos.html"),
    "lopez": require("../resources/enlightenment/qa/lopez.html"),
    "bap": require("../resources/enlightenment/qa/bap.html"),
    "christophe": require("../resources/enlightenment/qa/christophe.html"),
    "david": require("../resources/enlightenment/qa/david.html"),
    "nataliya": require("../resources/enlightenment/qa/nataliya.html"),
    "julia": require("../resources/enlightenment/qa/julia.html"),
    "joyce_wright": require("../resources/enlightenment/qa/joyce_wright.html"),
    "schibber": require("../resources/enlightenment/qa/schibber.html"),
    "r_e_greene": require("../resources/enlightenment/qa/r_e_greene.html"),
    "hubble": require("../resources/enlightenment/qa/hubble.html"),
    "pankaj_mittal": require("../resources/enlightenment/qa/pankaj_mittal.html"),
    "paul_klein": require("../resources/enlightenment/qa/paul_klein.html"),
    "prasanta_nayak": require("../resources/enlightenment/qa/prasanta_nayak.html"),
    "nick_jimison": require("../resources/enlightenment/qa/nick_jimison.html"),
    "alex": require("../resources/enlightenment/qa/alex.html"),
    "mahiralok": require("../resources/enlightenment/qa/mahiralok.html"),
    "alvyjane": require("../resources/enlightenment/qa/alvyjane.html"),
    "michaeld5": require("../resources/enlightenment/qa/michaeld5.html"),
    "markd6": require("../resources/enlightenment/qa/markd6.html"),
    "helen": require("../resources/enlightenment/qa/helen.html"),
    "mav": require("../resources/enlightenment/qa/mav.html"),
    "ganesan": require("../resources/enlightenment/qa/ganesan.html"),
    "andy": require("../resources/enlightenment/qa/andy.html"),
    "gayatri": require("../resources/enlightenment/qa/gayatri.html"),
    "alex2": require("../resources/enlightenment/qa/alex2.html"),
    "eric": require("../resources/enlightenment/qa/eric.html"),
    "cat": require("../resources/enlightenment/qa/cat.html"),
    "randy": require("../resources/enlightenment/qa/randy.html"),
    "majid": require("../resources/enlightenment/qa/majid.html"),
    "mike": require("../resources/enlightenment/qa/mike.html"),
    "matthew": require("../resources/enlightenment/qa/matthew.html"),
    "eric2": require("../resources/enlightenment/qa/eric2.html"),
    "tarsem": require("../resources/enlightenment/qa/tarsem.html"),
    "simonea": require("../resources/enlightenment/qa/simonea.html"),
    "jamie": require("../resources/enlightenment/qa/jamie.html"),
    "chip": require("../resources/enlightenment/qa/chip.html"),
    "joeeb": require("../resources/enlightenment/qa/joeeb.html"),
    "ian": require("../resources/enlightenment/qa/ian.html"),
    "balaji": require("../resources/enlightenment/qa/balaji.html"),
    "upasna": require("../resources/enlightenment/qa/upasna.html"),
    "andrewb": require("../resources/enlightenment/qa/andrewb.html"),
    "erki": require("../resources/enlightenment/qa/erki.html"),
    "jasonn": require("../resources/enlightenment/qa/jasonn.html"),
    "arvind": require("../resources/enlightenment/qa/arvind.html"),
    //
    // about tathagata
    "appearance": require('../resources/enlightenment/about_tathagata/appearance.html'),
    "love": require('../resources/enlightenment/about_tathagata/love.html'),
    "struggle": require('../resources/enlightenment/about_tathagata/struggle.html'),
    //
    // books - traveler
    "traveler_1": require('../resources/enlightenment/publications/traveler/traveler_1.html'),
    "traveler_2": require('../resources/enlightenment/publications/traveler/traveler_2.html'),
    "traveler_3": require('../resources/enlightenment/publications/traveler/traveler_3.html'),
    "traveler_4": require('../resources/enlightenment/publications/traveler/traveler_4.html'),
    "traveler_5": require('../resources/enlightenment/publications/traveler/traveler_5.html'),
    "traveler_6": require('../resources/enlightenment/publications/traveler/traveler_6.html'),
    "traveler_7": require('../resources/enlightenment/publications/traveler/traveler_7.html'),
    "traveler_8": require('../resources/enlightenment/publications/traveler/traveler_8.html'),
    "traveler_9": require('../resources/enlightenment/publications/traveler/traveler_9.html'),
    "traveler_10": require('../resources/enlightenment/publications/traveler/traveler_10.html'),
    //
    // enlightenment book
    "intro_enlightenment": require('../resources/enlightenment/publications/intro_enlightenment.html'),
    "five_doubts": require('../resources/enlightenment/publications/five_doubts.html'),
    "enlightenment_qa": require('../resources/enlightenment/publications/enlightenment_qa.html'),
    //
    // voices of nature
    "voices1": require('../resources/enlightenment/publications/voices_of_nature/voices1.html'),
    "voices2": require('../resources/enlightenment/publications/voices_of_nature/voices2.html'),
    "voices3": require('../resources/enlightenment/publications/voices_of_nature/voices3.html'),
    "voices4": require('../resources/enlightenment/publications/voices_of_nature/voices4.html'),
    "voices5": require('../resources/enlightenment/publications/voices_of_nature/voices5.html'),
    "voices6": require('../resources/enlightenment/publications/voices_of_nature/voices6.html'),
    "voices7": require('../resources/enlightenment/publications/voices_of_nature/voices7.html'),
    "voices8": require('../resources/enlightenment/publications/voices_of_nature/voices8.html'),
    "voices9": require('../resources/enlightenment/publications/voices_of_nature/voices9.html'),
    //
    // conversations
    "convo_1": require('../resources/enlightenment/conversations/convo_1.html'),
    "convo_2": require('../resources/enlightenment/conversations/convo_2.html'),
    "convo_3": require('../resources/enlightenment/conversations/convo_3.html'),
    "convo_4": require('../resources/enlightenment/conversations/convo_4.html'),
    "convo_5": require('../resources/enlightenment/conversations/convo_5.html'),
    "convo_6": require('../resources/enlightenment/conversations/convo_6.html'),
    "convo_7": require('../resources/enlightenment/conversations/convo_7.html'),
    "convo_8": require('../resources/enlightenment/conversations/convo_8.html'),
    "convo_9": require('../resources/enlightenment/conversations/convo_9.html'),
    "convo_10": require('../resources/enlightenment/conversations/convo_10.html'),
    "convo_11": require('../resources/enlightenment/conversations/convo_11.html'),
    "convo_12": require('../resources/enlightenment/conversations/convo_12.html'),
    "convo_13": require('../resources/enlightenment/conversations/convo_13.html'),
    "convo_14": require('../resources/enlightenment/conversations/convo_14.html'),
    "convo_15": require('../resources/enlightenment/conversations/convo_15.html'),
    "convo_16": require('../resources/enlightenment/conversations/convo_16.html'),
    "convo_17": require('../resources/enlightenment/conversations/convo_17.html'),
    //
    // travel notes
    "nairobi": require('../resources/enlightenment/travel/nairobi.html'),
    "pune": require('../resources/enlightenment/travel/pune.html'),
    "bodh_gaya": require('../resources/enlightenment/travel/bodh_gaya.html'),
    "iit": require('../resources/enlightenment/travel/iit.html'),
    "leicester_square": require('../resources/enlightenment/travel/leicester_square.html')

}
export function htmlForId(html_id: string)
{
    return htmls_by_id[html_id]
}
//
export const content_map: { [key: string]: ContentMapElement[] } = 
{
    "home": [
        {
            cell: "Introduction from Publisher",
            html_id: "intro-from-publisher"
        },
        {
            cell: "Message from Master Tathagata",
            html_id: "message"
        },
        {
            cell: "Lectures, Articles, and Teachings",
            list_id: "lectures"
        },
        {
            cell: "Publications",
            list_id: "pubs"
        },
        {
            cell: "Conversations",
            list_id: "convos"
        },
        {
            cell: "Transcripts of Recordings",
            list_id: "transcriptions"
        },
        {
            cell: "Travel Accounts by Members",
            list_id: "travel-notes"
        },
        {
            cell: "Q & A from Visitors",
            list_id: "q-a"
        },
        {
            cell: "About Tathagata",
            list_id: "about-tathagata"
        },
        {
            cell: "New Translations",
            list_id: "new-translations"
        },
        {
            cell: "Links to Other Websites",
            list_id: "links"
        }
    ],
    "lectures": [
		{
			cell: "Main Subjects of the Lectures",
			descr: "",
			html_id: "subjects"
		},
        {
			cell: "What is Karma ?",
			descr: "Cause and Effect of Karma",
			html_id: "karma"
		},
		{
			cell: "What is Destiny ?",
			descr: "How Can We Change Our Destiny?",
			html_id: "destiny"
		},
		{
			cell: "What is Life ?",
			descr: "The Process from Birth until Death",
			html_id: "life"
		},
		{
			cell: "Happiness and Peace",
			descr: "How can we get Happiness and Peace?",
			html_id: "happiness_and_peace"
		},
		{
			cell: "Messages from Tathagata",
			descr: "The End of the World / Changing Period / Eschatology",
			html_id: "messages"
		},
        {
			cell: "Places of Lecture",
			descr: "",
			html_id: "places"
		},
		{
			cell: "Teaching of Tathagata",
			descr: "The Truth",
			html_id: "teaching"
		},
		{
			cell: "The Way of Enlightenment",
			descr: "April 1998 in Busan, Korea",
			html_id: "way_of_enlightenment"
		},
		{
			cell: "The World of Life",
			descr: "",
			html_id: "world_of_life"
		},
		{
			cell: "Human Beings and God",
			descr: "",
			html_id: "human_being_and_god"
		},
		{
			cell: "The Earth Seen Through Science",
			descr: "",
			html_id: "earth"
		},
        {
			cell: "Teaching from 11/26/2006",
			descr: "",
			html_id: "11262006"
		},
		{
			cell: "Teaching from 12/10/2006",
			descr: "",
			html_id: "12102006"
		},
		{
			cell: "Teaching from 12/17/2006",
			descr: "",
			html_id: "12172006"
		},
		{
			cell: "Teaching from 12/24/2006",
			descr: "",
			html_id: "12242006"
		},
		{
			cell: "Teaching from 2/25/2007",
			descr: "",
			html_id: "02252007"
		},
		{
			cell: "Teaching from 3/4/2007",
			descr: "",
			html_id: "03042007"
		}
    ],
    "pubs": [
        {
			cell: "Traveler",
			descr: "Poetry",
			list_id: "traveler"
		},
		{
			cell: "Enlightenment",
			descr: "Tathagata's book Enlightenment",
			list_id: "enlightenment-book"
		},
		{
			cell: "Voices of Nature",
			descr: "Published in Nature's Teaching Magazine",
			list_id: "voices-magazine"
		},
		{
			cell: "Lonely Struggle",
			descr: "Autobiography not yet translated - See 'New Translations'",
			list_id: "new-translations"
		}
    ],
    "traveler": [
        {
			cell: "Ch 1. Dearest wish",
			descr: "There was no place to dedicate conscience and courage again/In front of the man who has lived in the suffering./The solitary song of the man who had to walk along a lonely way,/Because of love toward the fatherland, has passed by burning young heart.",
			html_id: "traveler_1"
		},
		{
			cell: "Ch 2. Forgotten time",
			descr: "Where should I meet the true world./I did not have the place to ask it./I would rather have wished/The dark time was dream.",
			html_id: "traveler_2"
		},
		{
			cell: "Ch 3. Story of Yeon-hwa island",
			descr: "An innocent man had to see a sin/Was heaven's meaning./Because there was no place to hide his mind,/He who had to confine himself to a solitary island/Lamented as following.",
			html_id: "traveler_3"
		},
		{
			cell: "Ch 4. Sound of heaven",
			descr: "New world appeared in my calm mind./I saw myself/Who did not have anguish nor fantasy./THe sound of heaven was heard/in my lonely heart.",
			html_id: "traveler_4"
		},
		{
			cell: "Ch 5. Traveler",
			descr: "Heaven made me burdened./Nobody could bear that burden instead of me./So I had to wander about the world again.",
			html_id: "traveler_5"
		},
		{
			cell: "Ch 6. A grain of seed",
			descr: "Soyeon./This is the first name/That I gave for the world./After having given this name,/I told her all my secrets.",
			html_id: "traveler_6"
		},
		{
			cell: "Ch 7. Lamentation",
			descr: "This is the song/That I used to sing,/Having seen myself who has no place to go and to stay./Heaven, let me find a rightous man today./And let the new world be theirs by them.",
			html_id: "traveler_7"
		},
		{
			cell: "Ch 8. Law of cause and effect",
			descr: "The law of cause and effect is the eternal promise that exists in our world./We call this promise truth./I will tell things of the world by this law.",
			html_id: "traveler_8"
		},
		{
			cell: "Ch 9. Questions and answers",
			descr: "There is something we can not believe in the world./However, as time goes by, people come to know such a thing./And then it is clear that truth and falsehood can be proved in a fact.",
			html_id: "traveler_9"
		},
		{
			cell: "Ch 10. History of tathagata",
			descr: "Truth exists forever./If apples do not look like apples,/If apples do not have the taste of those,/We can not call them apples.",
			html_id: "traveler_10"
		}
    ],
    "enlightenment-book": [
		{
			cell: "Introduction to Enlightenment",
			descr: "",
			html_id: "intro_enlightenment"
		},
		{
			cell: "Five Doubts",
			descr: "",
			html_id: "five_doubts"
		},
		{
			cell: "Questions and Answers",
			descr: "",
			html_id: "enlightenment_qa"
		},
		{
			cell: "Main Contents of the Lectures",
			descr: "",
			html_id: "subjects"
		}
	],
    "voices-magazine": [
        {
			cell: "Voices of Nature Ch. 1",
			descr: "",
			html_id: "voices1",
			source_url: "http://natureteaching.com/teaching/1ho/voice1.htm"
		},
		{
			cell: "Voices of Nature Ch. 2",
			descr: "",
			html_id: "voices2",
			source_url: "http://natureteaching.com/teaching/2ho/voice2.htm"
		},
		{
			cell: "Voices of Nature Ch. 3",
			descr: "",
			html_id: "voices3",
			source_url: "http://natureteaching.com/teaching/3ho/voice3.htm"
		},
		{
			cell: "Voices of Nature Ch. 4",
			descr: "",
			html_id: "voices4",
			source_url: "http://natureteaching.com/teaching/4ho/voice4.htm"
		},
		{
			cell: "Voices of Nature Ch. 5",
			descr: "",
			html_id: "voices5",
			source_url: "http://natureteaching.com/teaching/5ho/voice5.htm"
		},
		{
			cell: "Voices of Nature Ch. 6",
			descr: "",
			html_id: "voices6",
			source_url: "http://natureteaching.com/teaching/6ho/voice6.htm"
		},
		{
			cell: "Voices of Nature Ch. 7",
			descr: "",
			html_id: "voices7",
			source_url: "http://natureteaching.com/teaching/7ho/voice7.htm"
		},
		{
			cell: "Voices of Nature Ch. 8",
			descr: "",
			html_id: "voices8",
			source_url: "http://natureteaching.com/teaching/8ho/voice8.htm"
		},
		{
			cell: "Voices of Nature Ch. 9",
			descr: "",
			html_id: "voices9",
			source_url: "http://natureteaching.com/teaching/9ho/voice9.htm"
		}
    ],
    "convos": [
        {
			cell: "Seongbon, the First King’s teacher in Thailand",
			descr: "Thailand",
			html_id: "convo_1"
		},
		{
			cell: "With contemporary leader, Buddhadhasa of Thailand Buddhism",
			descr: "Thailand",
			html_id: "convo_2"
		},
		{
			cell: "With contemporary Indian leader, J. P. Vaswani",
			descr: "India",
			html_id: "convo_3"
		},
		{
			cell: "Agwani (The contemporary president of Nehru university)",
			descr: "India",
			html_id: "convo_4"
		},
		{
			cell: "The words with leader of Tibet Buddhism, Tenshav Rinpoche",
			descr: " ",
			html_id: "convo_5"
		},
		{
			cell: "Meeting with Mr. Gupte, the contemporary President of Buna University in Buna",
			descr: "India",
			html_id: "convo_6"
		},
		{
			cell: "Meeting with Hindu Shankaracharya in Puna",
			descr: "India",
			html_id: "convo_7"
		},
		{
			cell: "Meeting with professor Wanzala, the head of department in humanity college at the University of Nairobi, Kenya",
			descr: "Kenya",
			html_id: "convo_8"
		},
		{
			cell: "Dialog with Philosopher Boyd in Budapest, Hungary",
			descr: "Hungary",
			html_id: "convo_9"
		},
		{
			cell: "Dialog with doctor Giryeo Jang in Busan",
			descr: "South Korea",
			html_id: "convo_10"
		},
		{
			cell: "Samwon Rinpoche, The president of University of Tibetan Buddhism, Saranad",
			descr: " ",
			html_id: "convo_11"
		},
		{
			cell: "Open lecture at IIT, India",
			descr: "India",
			html_id: "convo_12"
		},
		{
			cell: "At Gandhi University, India",
			descr: "India",
			html_id: "convo_13"
		},
		{
			cell: "At University of Delhi, India",
			descr: "India",
			html_id: "convo_14"
		},
		{
			cell: "Hindu University, Banarashi India",
			descr: "India",
			html_id: "convo_15"
		},
		{
			cell: "Oxford University, U.K",
			descr: "U.K",
			html_id: "convo_16"
		},
		{
			cell: "Imperial college, University of London, U.K",
			descr: "U.K",
			html_id: "convo_17"
		}
    ],
    "transcriptions": [
        {
            cell: ""
        }
    ],
    "travel-notes": [
        {
			cell: "People met in Nairobi",
			descr: "Nairobi, Kenya",
			html_id: "nairobi"
		},
		{
			cell: "Pune University",
			descr: "Pune, Maharashtra, India",
			html_id: "pune"
		},
		{
			cell: "Travel to Bodh Gaya",
			descr: "Bodh Gaya, Bihar, India",
			html_id: "bodh_gaya"
		},
		{
			cell: "Indian Institute of Technology",
			descr: "New Delhi, India",
			html_id: "iit"
		},
		{
			cell: "Leicester Square",
			descr: "London, UK",
			html_id: "leicester_square"
		}
    ],
    "q-a": [
        {
            cell: "Disclaimer",
            descr: "From This Publisher",
            html_id: "q_a_disclaimer"
        },
        {
			cell: "Q1 - From Steve",
			descr: "11/13/2005",
			html_id: "steve",
			source_url: "http://www.members.tripod.com/tathagata2000/steve.htm"
		},
		{
			cell: "Q2 - From Santosh",
			descr: "11/14/2005",
			html_id: "santosh",
			source_url: "http://www.members.tripod.com/tathagata2000/santosh.htm"
		},
		{
			cell: "Q3 - From Marcello",
			descr: "11/16/2005",
			html_id: "marcello",
			source_url: "http://www.members.tripod.com/tathagata2000/marcello.htm"
		},
		{
			cell: "Q4 - From Michael",
			descr: "11/26/2005",
			html_id: "michael",
			source_url: "http://www.members.tripod.com/tathagata2000/michael.htm"
		},
		{
			cell: "Q5 - From Jenny",
			descr: "12/15/2005",
			html_id: "jenny",
			source_url: "http://www.members.tripod.com/tathagata2000/jenny.htm"
		},
		{
			cell: "Q6 - From Indrajit",
			descr: "4/10/2006",
			html_id: "indrajit",
			source_url: "http://www.members.tripod.com/tathagata2000/indrajit.htm"
		},
		{
			cell: "Q7 - From Peter",
			descr: "4/21/2006",
			html_id: "peter",
			source_url: "http://www.members.tripod.com/tathagata2000/peter.htm"
		},
		{
			cell: "Q8 - From Barbara",
			descr: "5/3/2006",
			html_id: "barbara",
			source_url: "http://www.members.tripod.com/tathagata2000/barbara.htm"
		},
		{
			cell: "Q9 - From Vivian",
			descr: "6/7/2006",
			html_id: "vivian",
			source_url: "http://www.members.tripod.com/tathagata2000/vivian.htm"
		},
		{
			cell: "Q10 - From Vanessa",
			descr: "7/25/2006",
			html_id: "vanessa",
			source_url: "http://www.members.tripod.com/tathagata2000/vanessa.htm"
		},
		{
			cell: "Q11 - From Nexarius",
			descr: "7/31/2006",
			html_id: "nexarius",
			source_url: "http://www.members.tripod.com/tathagata2000/nexarius.htm"
		},
		{
			cell: "Q12 - From Somnath",
			descr: "8/2/2006",
			html_id: "somnath",
			source_url: "http://www.members.tripod.com/tathagata2000/somnath.htm"
		},
		{
			cell: "Q13 - From Pradeep",
			descr: "8/6/2006",
			html_id: "pradeep",
			source_url: "http://www.members.tripod.com/tathagata2000/pradeep.htm"
		},
		{
			cell: "Q14 - From Dave Cote",
			descr: "8/19/2006",
			html_id: "dave_cote",
			source_url: "http://www.members.tripod.com/tathagata2000/dave_cote.htm"
		},
		{
			cell: "Q15 - From Karen",
			descr: "8/20/2006",
			html_id: "karen_lonsdale",
			source_url: "http://www.members.tripod.com/tathagata2000/karen.htm"
		},
		{
			cell: "Q16 - From Sean",
			descr: "8/21/2006",
			html_id: "sean",
			source_url: "http://www.members.tripod.com/tathagata2000/sean.htm"
		},
		{
			cell: "Q17 - From Cacohen",
			descr: "8/24/2006",
			html_id: "cacohen",
			source_url: "http://www.members.tripod.com/tathagata2000/cacohen.htm"
		},
		{
			cell: "Q18 - From Shailendra",
			descr: "8/29/2006",
			html_id: "shailendra",
			source_url: "http://www.members.tripod.com/tathagata2000/shailendra.htm"
		},
		{
			cell: "Q19 - From Tom",
			descr: "8/29/2006",
			html_id: "tom",
			source_url: "http://www.members.tripod.com/tathagata2000/tom.htm"
		},
		{
			cell: "Q20 - From Cindy",
			descr: "9/4/2006",
			html_id: "cindy",
			source_url: "http://www.members.tripod.com/tathagata2000/cindy.htm"
		},
        {
			cell: "Q21 - From R Kondur",
			descr: "9/24/2006",
			html_id: "r_kondur",
			source_url: "http://www.members.tripod.com/tathagata2000/r_kondur.htm"
		},
		{
			cell: "Q22 - From Ying",
			descr: "10/26/2006",
			html_id: "ying",
			source_url: "http://www.members.tripod.com/tathagata2000/ying.htm"
		},
		{
			cell: "Q23 - From Jan",
			descr: "10/28/2006",
			html_id: "jan",
			source_url: "http://www.members.tripod.com/tathagata2000/jan.htm"
		},
		{
			cell: "Q24 - From Steve",
			descr: "11/23/2006",
			html_id: "steve2",
			source_url: "http://www.members.tripod.com/tathagata2000/steve2.htm"
		},
		{
			cell: "Q25 - From Edward",
			descr: "11/29/2006",
			html_id: "edward",
			source_url: "http://www.members.tripod.com/tathagata2000/edward.htm"
		},
		{
			cell: "Q26 - From Wadine",
			descr: "11/30/2006",
			html_id: "wadine",
			source_url: "http://www.members.tripod.com/tathagata2000/wadine.htm"
		},
		{
			cell: "Q27 - From Pol Shappy",
			descr: "12/8/2006",
			html_id: "pol_shappy",
			source_url: "http://www.members.tripod.com/tathagata2000/pol_shappy.htm"
		},
		{
			cell: "Q28 - From John",
			descr: "12/29/2006",
			html_id: "john",
			source_url: "http://www.members.tripod.com/tathagata2000/john.htm"
		},
		{
			cell: "Q29 - From Richard",
			descr: "12/30/2006",
			html_id: "richard",
			source_url: "http://www.members.tripod.com/tathagata2000/richard.htm"
		},
		{
			cell: "Q30 - From Neil",
			descr: "1/7/2007",
			html_id: "neil",
			source_url: "http://www.members.tripod.com/tathagata2000/neil.htm"
		},
		{
			cell: "Q31 - From Robert",
			descr: "1/9/2007",
			html_id: "robert",
			source_url: "http://www.members.tripod.com/tathagata2000/robert.htm"
		},
		{
			cell: "Q32 - From Bryan",
			descr: "1/11/2007",
			html_id: "bryan",
			source_url: "http://www.members.tripod.com/tathagata2000/bryan.htm"
		},
		{
			cell: "Q33 - From Bob",
			descr: "1/12/2007",
			html_id: "bob",
			source_url: "http://www.members.tripod.com/tathagata2000/bob.htm"
		},
		{
			cell: "Q34 - From Sandhya",
			descr: "1/13/2007",
			html_id: "sandhya",
			source_url: "http://www.members.tripod.com/tathagata2000/sandhya.htm"
		},
		{
			cell: "Q35 - From Stanley",
			descr: "1/20/2007",
			html_id: "stanely",
			source_url: "http://www.members.tripod.com/tathagata2000/stanely.htm"
		},
		{
			cell: "Q36 - From Craig",
			descr: "2/22/2007",
			html_id: "craig",
			source_url: "http://www.members.tripod.com/tathagata2000/craig.htm"
		},
		{
			cell: "Q37 - From Shaun",
			descr: "3/2/2007",
			html_id: "shaun",
			source_url: "http://www.members.tripod.com/tathagata2000/shaun.htm"
		},
		{
			cell: "Q38 - From Rani",
			descr: "3/2/2007",
			html_id: "rani",
			source_url: "http://www.members.tripod.com/tathagata2000/rani.htm"
		},
		{
			cell: "Q39 - From Leon",
			descr: "3/4/2007",
			html_id: "leon",
			source_url: "http://www.members.tripod.com/tathagata2000/leon.htm"
		},
		{
			cell: "Q40 - From Bruce",
			descr: "3/10/2007",
			html_id: "bruce",
			source_url: "http://www.members.tripod.com/tathagata2000/bruce.htm"
		},
        {
			cell: "Q41 - From Dan",
			descr: "3/12/2007",
			html_id: "dan",
			source_url: "http://www.members.tripod.com/tathagata2000/dan.htm"
		},
		{
			cell: "Q42 - From RS Champagne",
			descr: "3/16/2007",
			html_id: "rs_champagne",
			source_url: "http://www.members.tripod.com/tathagata2000/rs_champagne.htm"
		},
		{
			cell: "Q43 - From Kong KC",
			descr: "3/18/2007",
			html_id: "kongkc",
			source_url: "http://www.members.tripod.com/tathagata2000/kongkc.htm"
		},
		{
			cell: "Q44 - From Matt Hewitt",
			descr: "3/21/2007",
			html_id: "matt_hewitt",
			source_url: "http://www.members.tripod.com/tathagata2000/matt_hewitt.htm"
		},
		{
			cell: "Q45 - From J Van Aardt",
			descr: "3/24/2007",
			html_id: "jvanaardt",
			source_url: "http://www.members.tripod.com/tathagata2000/jvanaardt.htm"
		},
		{
			cell: "Q46 - From Keith Butler",
			descr: "3/24/2007",
			html_id: "keith",
			source_url: "http://www.members.tripod.com/tathagata2000/keith.htm"
		},
		{
			cell: "Q47 - From Steve",
			descr: "3/26/2007",
			html_id: "steve3",
			source_url: "http://www.members.tripod.com/tathagata2000/steve3.htm"
		},
		{
			cell: "Q48 - From Toto",
			descr: "3/29/2007",
			html_id: "toto",
			source_url: "http://www.members.tripod.com/tathagata2000/toto.htm"
		},
		{
			cell: "Q49 - From Ing",
			descr: "4/3/2007",
			html_id: "ing",
			source_url: "http://www.members.tripod.com/tathagata2000/ing.htm"
		},
		{
			cell: "Q50 - From Ishaqui",
			descr: "4/3/2007",
			html_id: "ishaqui",
			source_url: "http://www.members.tripod.com/tathagata2000/ishaqui.htm"
		},
		{
			cell: "Q51 - From Marios",
			descr: "4/5/2007",
			html_id: "marios",
			source_url: "http://www.members.tripod.com/tathagata2000/marios.htm"
		},
		{
			cell: "Q52 - From Nitin",
			descr: "4/9/2007",
			html_id: "nitin",
			source_url: "http://www.members.tripod.com/tathagata2000/nitin.htm"
		},
		{
			cell: "Q53 - From Christopher Sambo",
			descr: "4/1/2007",
			html_id: "christopher_sambo",
			source_url: "http://www.members.tripod.com/tathagata2000/christopher_sambo.htm"
		},
		{
			cell: "Q54 - From Michael",
			descr: "4/16/2007",
			html_id: "michael80",
			source_url: "http://www.members.tripod.com/tathagata2000/michael80.htm"
		},
		{
			cell: "Q55 - From Joe",
			descr: "4/17/2007",
			html_id: "joe",
			source_url: "http://www.members.tripod.com/tathagata2000/joe.htm"
		},
		{
			cell: "Q56 - From JK",
			descr: "4/24/2007",
			html_id: "jk",
			source_url: "http://www.members.tripod.com/tathagata2000/jk.htm"
		},
		{
			cell: "Q57 - From James Ling",
			descr: "4/27/2007",
			html_id: "james_ling",
			source_url: "http://www.members.tripod.com/tathagata2000/james_ling.htm"
		},
		{
			cell: "Q58 - From LRL Gupta",
			descr: "4/30/2007",
			html_id: "lrl_gupta",
			source_url: "http://www.members.tripod.com/tathagata2000/lrl_gupta.htm"
		},
		{
			cell: "Q59 - From George K",
			descr: "5/5/2007",
			html_id: "george_k",
			source_url: "http://www.members.tripod.com/tathagata2000/george_k.htm"
		},
		{
			cell: "Q60 - From Leo",
			descr: "5/7/2007",
			html_id: "leo",
			source_url: "http://www.members.tripod.com/tathagata2000/leo.htm"
		},
        {
			cell: "Q61 - From Anele",
			descr: "5/24/2007",
			html_id: "anele",
			source_url: "http://www.members.tripod.com/tathagata2000/anele.htm"
		},
		{
			cell: "Q62 - From Zihao",
			descr: "5/24/2007",
			html_id: "zihao",
			source_url: "http://www.members.tripod.com/tathagata2000/zihao.htm"
		},
		{
			cell: "Q63 - From Simon",
			descr: "6/3/2007",
			html_id: "simon",
			source_url: "http://www.members.tripod.com/tathagata2000/simon.htm"
		},
		{
			cell: "Q64 - From Gordon",
			descr: "6/3/2007",
			html_id: "gordon",
			source_url: "http://www.members.tripod.com/tathagata2000/gordon.htm"
		},
		{
			cell: "Q65 - From Cherry",
			descr: "6/9/2007",
			html_id: "cherry",
			source_url: "http://www.members.tripod.com/tathagata2000/cherry.htm"
		},
		{
			cell: "Q66 - From Mir Mehmood",
			descr: "6/12/2007",
			html_id: "mir_mehmood",
			source_url: "http://www.members.tripod.com/tathagata2000/mir_mehmood.htm"
		},
		{
			cell: "Q67 - From Henry",
			descr: "6/17/2007",
			html_id: "henry",
			source_url: "http://www.members.tripod.com/tathagata2000/henry.htm"
		},
		{
			cell: "Q68 - From Ron",
			descr: "6/20/2007",
			html_id: "ron",
			source_url: "http://www.members.tripod.com/tathagata2000/ron.htm"
		},
		{
			cell: "Q69 - From Kim",
			descr: "7/4/2007",
			html_id: "kim",
			source_url: "http://www.members.tripod.com/tathagata2000/kim.htm"
		},
		{
			cell: "Q70 - From Jerry",
			descr: "7/4/2007",
			html_id: "jerry",
			source_url: "http://www.members.tripod.com/tathagata2000/jerry.htm"
		},
		{
			cell: "Q71 - From Vinod",
			descr: "7/8/2007",
			html_id: "vinod",
			source_url: "http://www.members.tripod.com/tathagata2000/vinod.htm"
		},
		{
			cell: "Q72 - From Cri",
			descr: "7/11/2007",
			html_id: "cri",
			source_url: "http://www.members.tripod.com/tathagata2000/cri.htm"
		},
		{
			cell: "Q73 - From AP",
			descr: "7/29/2007",
			html_id: "ap",
			source_url: "http://www.members.tripod.com/tathagata2000/ap.htm"
		},
		{
			cell: "Q74 - From Kyle",
			descr: "7/30/2007",
			html_id: "kyle",
			source_url: "http://www.members.tripod.com/tathagata2000/kyle.htm"
		},
		{
			cell: "Q75 - From Peter",
			descr: "7/30/2007",
			html_id: "peterae",
			source_url: "http://www.members.tripod.com/tathagata2000/peterae.htm"
		},
		{
			cell: "Q76 - From Charan Singh",
			descr: "8/1/2007",
			html_id: "charan_singh",
			source_url: "http://www.members.tripod.com/tathagata2000/charan_singh.htm"
		},
		{
			cell: "Q77 - From Clay",
			descr: "8/20/2007",
			html_id: "clay",
			source_url: "http://www.members.tripod.com/tathagata2000/clay.htm"
		},
		{
			cell: "Q78 - From Ingmar",
			descr: "8/21/2007",
			html_id: "ingmar",
			source_url: "http://www.members.tripod.com/tathagata2000/ingmar.htm"
		},
		{
			cell: "Q79 - From Pamela",
			descr: "8/30/2007",
			html_id: "pamela",
			source_url: "http://www.members.tripod.com/tathagata2000/pamela.htm"
		},
		{
			cell: "Q80 - From Xi",
			descr: "9/7/2007",
			html_id: "xi",
			source_url: "http://www.members.tripod.com/tathagata2000/xi.htm"
		},
        {
			cell: "Q81 - From Brenda",
			descr: "9/12/2007",
			html_id: "brenda",
			source_url: "http://www.members.tripod.com/tathagata2000/brenda.htm"
		},
		{
			cell: "Q82 - From V",
			descr: "9/15/2007",
			html_id: "v",
			source_url: "http://www.members.tripod.com/tathagata2000/v.htm"
		},
		{
			cell: "Q83 - From Karloze",
			descr: "11/6/2007",
			html_id: "karloze",
			source_url: "http://www.members.tripod.com/tathagata2000/karloze.htm"
		},
		{
			cell: "Q84 - From Sean",
			descr: "11/21/2007",
			html_id: "seanb6",
			source_url: "http://www.members.tripod.com/tathagata2000/seanb6.htm"
		},
		{
			cell: "Q85 - From SWP",
			descr: "11/22/2007",
			html_id: "swp",
			source_url: "http://www.members.tripod.com/tathagata2000/swp.htm"
		},
		{
			cell: "Q86 - From Pravin",
			descr: "11/24/2007",
			html_id: "pravin",
			source_url: "http://www.members.tripod.com/tathagata2000/pravin.htm"
		},
		{
			cell: "Q87 - From Frank",
			descr: "11/25/2007",
			html_id: "frank",
			source_url: "http://www.members.tripod.com/tathagata2000/frank.htm"
		},
		{
			cell: "Q88 - From Indu",
			descr: "12/2/2007",
			html_id: "indu",
			source_url: "http://www.members.tripod.com/tathagata2000/indu.htm"
		},
		{
			cell: "Q89 - From Joyce",
			descr: "12/6/2007",
			html_id: "joyce",
			source_url: "http://www.members.tripod.com/tathagata2000/joyce.htm"
		},
		{
			cell: "Q90 - From LK",
			descr: "12/10/2007",
			html_id: "lk",
			source_url: "http://www.members.tripod.com/tathagata2000/lk.htm"
		},
		{
			cell: "Q91 - From D",
			descr: "12/12/2007",
			html_id: "d",
			source_url: "http://www.members.tripod.com/tathagata2000/d.htm"
		},
		{
			cell: "Q92 - From Daniel",
			descr: "12/17/2007",
			html_id: "daniel",
			source_url: "http://www.members.tripod.com/tathagata2000/daniel.htm"
		},
		{
			cell: "Q93 - From Mark",
			descr: "12/22/2007",
			html_id: "mark",
			source_url: "http://www.members.tripod.com/tathagata2000/mark.htm"
		},
		{
			cell: "Q94 - From Fatos",
			descr: "12/22/2007",
			html_id: "fatos",
			source_url: "http://www.members.tripod.com/tathagata2000/fatos.htm"
		},
		{
			cell: "Q95 - From Dr. Lopez",
			descr: "12/23/2007",
			html_id: "lopez",
			source_url: "http://www.members.tripod.com/tathagata2000/lopez.htm"
		},
		{
			cell: "Q96 - From Bap",
			descr: "1/4/2008",
			html_id: "bap",
			source_url: "http://www.members.tripod.com/tathagata2000/bap.htm"
		},
		{
			cell: "Q97 - From Christophe",
			descr: "1/5/2008",
			html_id: "christophe",
			source_url: "http://www.members.tripod.com/tathagata2000/christophe.htm"
		},
		{
			cell: "Q98 - From David",
			descr: "1/6/2008",
			html_id: "david",
			source_url: "http://www.members.tripod.com/tathagata2000/david.htm"
		},
		{
			cell: "Q99 - From Nataliya",
			descr: "1/9/2008",
			html_id: "nataliya",
			source_url: "http://www.members.tripod.com/tathagata2000/nataliya.htm"
		},
		{
			cell: "Q100 - From Julia",
			descr: "1/8/2008",
			html_id: "julia",
			source_url: "http://www.members.tripod.com/tathagata2000/julia.htm"
		},
        {
			cell: "Q101 - From Joyce Wright",
			descr: "1/15/2008",
			html_id: "joyce_wright",
			source_url: "http://www.members.tripod.com/tathagata2000/joyce_wright.htm"
		},
		{
			cell: "Q102 - From Schibber",
			descr: "1/18/2008",
			html_id: "schibber",
			source_url: "http://www.members.tripod.com/tathagata2000/schibber.htm"
		},
		{
			cell: "Q103 - From R E Greene",
			descr: "1/21/2008",
			html_id: "r_e_greene",
			source_url: "http://www.members.tripod.com/tathagata2000/r_e_greene.htm"
		},
		{
			cell: "Q104 - From Hubble",
			descr: "1/24/2008",
			html_id: "hubble",
			source_url: "http://www.members.tripod.com/tathagata2000/hubble.htm"
		},
		{
			cell: "Q105 - From Pankaj Mittal",
			descr: "1/28/2008",
			html_id: "pankaj_mittal",
			source_url: "http://www.members.tripod.com/tathagata2000/pankaj_mittal.htm"
		},
		{
			cell: "Q106 - From Paul Klein",
			descr: "2/10/2008",
			html_id: "paul_klein",
			source_url: "http://www.members.tripod.com/tathagata2000/paul_klein.htm"
		},
		{
			cell: "Q107 - From Prasanta Nayak",
			descr: "2/12/2008",
			html_id: "prasanta_nayak",
			source_url: "http://www.members.tripod.com/tathagata2000/prasanta_nayak.htm"
		},
		{
			cell: "Q108 - From Nick Jimison",
			descr: "2/13/2008",
			html_id: "nick_jimison",
			source_url: "http://www.members.tripod.com/tathagata2000/nick_jimison.htm"
		},
		{
			cell: "Q109 - From Alex",
			descr: "2/14/2008",
			html_id: "alex",
			source_url: "http://www.members.tripod.com/tathagata2000/alex.htm"
		},
		{
			cell: "Q110 - From Mahiralok",
			descr: "2/16/2008",
			html_id: "mahiralok",
			source_url: "http://www.members.tripod.com/tathagata2000/mahiralok.htm"
		},
		{
			cell: "Q111 - From Alvyjane",
			descr: "2/18/2008",
			html_id: "alvyjane",
			source_url: "http://www.members.tripod.com/tathagata2000/alvyjane.htm"
		},
		{
			cell: "Q112 - From Michael",
			descr: "2/21/2008",
			html_id: "michaeld5",
			source_url: "http://www.members.tripod.com/tathagata2000/.htm"
		},
		{
			cell: "Q113 - From Mark",
			descr: "2/21/2008",
			html_id: "markd6",
			source_url: "http://www.members.tripod.com/tathagata2000/markd6.htm"
		},
		{
			cell: "Q114 - From Helen",
			descr: "2/22/2008",
			html_id: "helen",
			source_url: "http://www.members.tripod.com/tathagata2000/helen.htm"
		},
		{
			cell: "Q115 - From Mav",
			descr: "2/27/2008",
			html_id: "mav",
			source_url: "http://www.members.tripod.com/tathagata2000/mav.htm"
		},
		{
			cell: "Q116 - From Ganesan",
			descr: "3/11/2008",
			html_id: "ganesan",
			source_url: "http://www.members.tripod.com/tathagata2000/ganesan.htm"
		},
		{
			cell: "Q117 - From Andy",
			descr: "3/16/2008",
			html_id: "andy",
			source_url: "http://www.members.tripod.com/tathagata2000/andy.htm"
		},
		{
			cell: "Q118 - From Gayatri",
			descr: "3/26/2008",
			html_id: "gayatri",
			source_url: "http://www.members.tripod.com/tathagata2000/gayatri.htm"
		},
		{
			cell: "Q119 - From Alex",
			descr: "3/26/2008",
			html_id: "alex2",
			source_url: "http://www.members.tripod.com/tathagata2000/alex2.htm"
		},
		{
			cell: "Q120 - From Eric",
			descr: "8/7/2008",
			html_id: "eric",
			source_url: "http://www.members.tripod.com/tathagata2000/eric.htm"
		},
        {
			cell: "Q121 - From Cat",
			descr: "4/10/2008",
			html_id: "cat",
			source_url: "http://www.members.tripod.com/tathagata2000/cat.htm"
		},
		{
			cell: "Q122 - From Randy",
			descr: "4/24/2008",
			html_id: "randy",
			source_url: "http://www.members.tripod.com/tathagata2000/randy.htm"
		},
		{
			cell: "Q123 - From Majid",
			descr: "4/20/2008",
			html_id: "majid",
			source_url: "http://www.members.tripod.com/tathagata2000/majid.htm"
		},
		{
			cell: "Q124 - From Mike",
			descr: "4/20/2008",
			html_id: "mike",
			source_url: "http://www.members.tripod.com/tathagata2000/mike.htm"
		},
		{
			cell: "Q125 - From Matthew",
			descr: "4/15/2008",
			html_id: "matthew",
			source_url: "http://www.members.tripod.com/tathagata2000/matthew.htm"
		},
		{
			cell: "Q126 - From Eric",
			descr: "4/23/2008",
			html_id: "eric2",
			source_url: "http://www.members.tripod.com/tathagata2000/eric2.htm"
		},
		{
			cell: "Q127 - From Tarsem",
			descr: "4/24/2008",
			html_id: "tarsem",
			source_url: "http://www.members.tripod.com/tathagata2000/tarsem.htm"
		},
		{
			cell: "Q128 - From Simon",
			descr: "4/25/2008",
			html_id: "simonea",
			source_url: "http://www.members.tripod.com/tathagata2000/simonea.htm"
		},
		{
			cell: "Q129 - From Jamie",
			descr: "5/6/2008",
			html_id: "jamie",
			source_url: "http://www.members.tripod.com/tathagata2000/jamie.htm"
		},
		{
			cell: "Q130 - From Chip",
			descr: "5/19/2008",
			html_id: "chip",
			source_url: "http://www.members.tripod.com/tathagata2000/chip.htm"
		},
		{
			cell: "Q131 - From Joe",
			descr: "5/21/2008",
			html_id: "joeeb",
			source_url: "http://www.members.tripod.com/tathagata2000/joeeb.htm"
		},
		{
			cell: "Q132 - From Ian",
			descr: "5/22/2008",
			html_id: "ian",
			source_url: "http://www.members.tripod.com/tathagata2000/.htm"
		},
		{
			cell: "Q133 - From Balaji",
			descr: "6/3/2008",
			html_id: "balaji",
			source_url: "http://www.members.tripod.com/tathagata2000/balaji.htm"
		},
		{
			cell: "Q134 - From Upasna",
			descr: "6/4/2008",
			html_id: "upasna",
			source_url: "http://www.members.tripod.com/tathagata2000/upasna.htm"
		},
		{
			cell: "Q135 - From Andrew",
			descr: "6/10/2008",
			html_id: "andrewb",
			source_url: "http://www.members.tripod.com/tathagata2000/andrewb.htm"
		},
		{
			cell: "Q136 - From Erki",
			descr: "6/16/2008",
			html_id: "erki",
			source_url: "http://www.members.tripod.com/tathagata2000/erki.htm"
		},
		{
			cell: "Q137 - From Jason N",
			descr: "6/17/2008",
			html_id: "jasonn",
			source_url: "http://www.members.tripod.com/tathagata2000/jasonn.htm"
		},
		{
			cell: "Q138 - From Arvind",
			descr: "7/18/2008",
			html_id: "arvind",
			source_url: "http://www.members.tripod.com/tathagata2000/arvind.htm"
		}
    ],
    "about-tathagata": [
        {
            cell: "The Life of Tathagata",
            descr: "Appearance of the Enlightened Being",
            html_id: "appearance"
        },
		{
			cell: "Tathagata's Struggle",
			descr: "Ordeals Through Enlightenment",
			html_id: "struggle"
		},
		{
			cell: "Enlightenment of Tathagata",
			descr: "Tathagata's Love for Mankind",
			html_id: "love"
		}
    ],
    "new-translations": [
        {
            cell: ""
        }
    ],
    "links": [
        {
			cell: "members.tripod.com/tathagata2000",
			descr: "Website with Tathagata's teachings in English, made by Paul Iddon in London.",
			url: "http://members.tripod.com/tathagata2000"
		},
		{
			cell: "www.lifeguide.or.kr",
			descr: "Tathagata in Korea.",
			url: "http://www.lifeguide.or.kr"
		},
		{
			cell: "www.natureteaching.com",
			descr: "A magazine published by members in Korea.",
			url: "http://www.natureteaching.com"
		},
		{
			cell: "www.snasc.com",
			descr: "Founded by Mr. Samhan Lee in 1986. The purpose of its foundation is to conduct research on problems of mankind and the solutions of problems in society.",
			url: "http://www.snasc.com"
		},
		{
			cell: "silsang.co.kr/",
			descr: "",
			url: "http://silsang.co.kr/"
		},
		{
			cell: "www.naturalscience.biz/",
			descr: "",
			url: "http://www.naturalscience.biz/"
		},
		{
			cell: "www.tathagata.info/",
			descr: "",
			url: "http://www.tathagata.info/"
		},
		{
			cell: "tathagatablog.wordpress.com/",
			descr: "Blog about Tathagata and his teachings with translations by Craig.",
			url: "https://tathagatablog.wordpress.com/"
		}
    ]
}
export function contentItemListWithId(list_id: string): ContentMapElement[]
{
    return content_map[list_id]
}

export const root_list_id = "home"
export let initial_root_list = contentItemListWithId(root_list_id)
