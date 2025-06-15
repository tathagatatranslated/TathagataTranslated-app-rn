//
//
import * as showdown from './showdown.min.js'
const { v4: uuidV4 } = require('uuid') 
//
//
export interface ContentMapElement
{
    runtimeUUID?: string // hydrated at runtime - useful in search for fast deduping - will not be nil
    //
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
let pdfEmbedHTML_pdfPath_prefix = '<html><style>html, body {margin: 0; height: 100%; overflow: hidden; } * { margin: 0; padding: 0; } embed { width: 100%; height: 100vh; } </style><body><embed src="'
let pdfEmbedHTML_pdfPath_suffix = '" type="application/pdf"></body></html>'
//
let imageEmbedHTML_imageEls_prefix = '<html><style></style><body>'
let imageEmbedHTML_imageEls_suffix = '</body></html>'
function imageElsHTMLStringFrom(requiredImageFileKeys: string[], optl_correspondingCaptionStrings: string[]|null)
{
    let hasCaptions = optl_correspondingCaptionStrings && typeof optl_correspondingCaptionStrings != 'undefined'
    if (hasCaptions) {
        if (requiredImageFileKeys.length != optl_correspondingCaptionStrings!.length) {
            throw new Error("Code fault: gallery_imageFileKeys.length != gallery_captionStrings.length")
        }
    }
    let str = ''
    let requiredImageFileKeys_length = requiredImageFileKeys.length
    for (var i = 0 ; i < requiredImageFileKeys_length ; i++) {
        str += '<image src="'+requiredImageFileKeys[i]+'" />'
        if (hasCaptions) {
            str += '<p>'+optl_correspondingCaptionStrings![i]+'</p>'
        }
        if (i < requiredImageFileKeys_length - 1) {
            str += '<br/>'
        }
    }
    return str
}
//
//
const htmls_by_id: { [key: string]: string } = 
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
    "leicester_square": require('../resources/enlightenment/travel/leicester_square.html'),
    //
    // transcriptions
    // .md files here will be hydrated as htmls from pathsFor_mds_by_html_id
    "tathagata-qa-while-traveling-the-usa": require('../resources/transcriptions/2011/08/tathagata-qa-while-traveling-the-usa.html'),
    "conversation-with-a-gravity-specialist": require('../resources/transcriptions/2011/08/conversation-with-a-gravity-specialist.html'),
    "during-a-discussion-with-a-cognitive-scientis": require('../resources/transcriptions/2011/08/during-a-discussion-with-a-cognitive-scientis.html'),
    "dialogue-with-a-professor-of-philosophy": require('../resources/transcriptions/2011/08/dialogue-with-a-professor-of-philosophy.html'),
    "tathagata-meets-a-professor": require('../resources/transcriptions/2011/08/tathagata-meets-a-professor.html'),
    "tathagata-meets-an-assistant-director-at-an-e": require('../resources/transcriptions/2011/08/tathagata-meets-an-assistant-director-at-an-e.html'),
    "economy-talk-in-tathagatas-hotel-accommodatio": require('../resources/transcriptions/2011/08/economy-talk-in-tathagatas-hotel-accommodatio.html'),
    
    "an-american-buddhist-monk-visits-master-tatha": require('../resources/transcriptions/2011/09/an-american-buddhist-monk-visits-master-tatha.html'),
    "tathagata-meets-a-catholic-nun": require('../resources/transcriptions/2011/09/tathagata-meets-a-catholic-nun.html'),
    "conversation-with-the-director-of-a-buddhist": require('../resources/transcriptions/2011/09/conversation-with-the-director-of-a-buddhist.html'),
    "conversations-with-three-professors-of-philos": require('../resources/transcriptions/2011/09/conversations-with-three-professors-of-philos.html'),
    "explanation-about-the-subjects-of-death-the-w": require('../resources/transcriptions/2011/09/explanation-about-the-subjects-of-death-the-w.html'),
    "meeting-buddhist-monks-in-thailand": require('../resources/transcriptions/2011/09/meeting-buddhist-monks-in-thailand.html'),
    "tathagata-giving-a-talk-in-thailand": require('../resources/transcriptions/2011/10/tathagata-giving-a-talk-in-thailand.html'),
    "master-tathagata-meets-a-global-climate-exper": require('../resources/transcriptions/2011/10/master-tathagata-meets-a-global-climate-exper.html'),
    "master-tathagata-meets-a-philosophy-professor": require('../resources/transcriptions/2011/10/master-tathagata-meets-a-philosophy-professor.html'),
    "meeting-in-the-philosophy-department": require('../resources/transcriptions/2011/11/meeting-in-the-philosophy-department.html'),
    
    "tathagata-during-hotel-room-talk": require('../resources/transcriptions/2012/03/tathagata-during-hotel-room-talk.html'),
    "satto-asks-master-tathagata-about-dreams": require('../resources/transcriptions/2012/03/satto-asks-master-tathagata-about-dreams.html'),
    "from-meeting-at-a-catholic-church": require('../resources/transcriptions/2012/03/from-meeting-at-a-catholic-church.html'),
    "last-part-of-a-conversation-with-a-professor": require('../resources/transcriptions/2012/03/last-part-of-a-conversation-with-a-professor.html'),
    "while-soyun-talks-to-satto": require('../resources/transcriptions/2012/03/while-soyun-talks-to-satto.html'),
    "meeting-a-brain-cognitive-science-specialist": require('../resources/transcriptions/2012/03/meeting-a-brain-cognitive-science-specialist.html'),
    "lunch-at-a-buddhist-temple": require('../resources/transcriptions/2012/05/lunch-at-a-buddhist-temple.html'),
    "at-a-universitys-international-affairs-office": require('../resources/transcriptions/2012/05/at-a-universitys-international-affairs-office.html'),
    "transcription-tathagata-quotes": require('../resources/transcriptions/2012/06/tathagata-quotes.html'),
    "malaysia-august-13th-2008": require('../resources/transcriptions/2012/07/malaysia-august-13th-2008.html'),
    "meeting-in-the-philosophy-department-part-3": require('../resources/transcriptions/2012/07/meeting-in-the-philosophy-department-part-3.html'),
    "meeting-in-the-philosophy-department-part-2": require('../resources/transcriptions/2012/07/meeting-in-the-philosophy-department-part-2.html'),
    "during-a-talk-with-a-cognitive-scientist": require('../resources/transcriptions/2012/10/during-a-talk-with-a-cognitive-scientist.html'),
    "brief-talk-with-a-lay-practitioner": require('../resources/transcriptions/2012/10/brief-talk-with-a-lay-practitioner.html'),
    "beginning-discussion-with-a-primate-cognition": require('../resources/transcriptions/2012/10/beginning-discussion-with-a-primate-cognition.html'),
    
    "visiting-a-buddhist-university": require('../resources/transcriptions/2013/03/visiting-a-buddhist-university.html'),
    //
    // translations
    // .md files here will be hydrated as htmls from pathsFor_mds_by_html_id
    //
    // translations - the traveler
    "new-traveler-foreword": require('../resources/TheTraveler/The Traveler - Foreword by This Publisher.html'),
    "new-traveler-ch1": require('../resources/TheTraveler/Chapter 1- Dearest Wish.html'),
    "new-traveler-ch2": require('../resources/TheTraveler/Chapter 2- Forgotten Time.html'),
    "new-traveler-ch3": require('../resources/TheTraveler/Chapter 3- The Story of Yunhwa [Lotus] Island.html'),
    "new-traveler-ch4": require('../resources/TheTraveler/Chapter 4- The Sound of Heaven.html'),
    "new-traveler-ch5": require('../resources/TheTraveler/Chapter 5- Traveler.html'),
    "new-traveler-ch6": require('../resources/TheTraveler/Chapter 6- A Grain of Seed.html'),
    "new-traveler-ch7": require('../resources/TheTraveler/Chapter 7- Deploration.html'),
    "new-traveler-ch8": require('../resources/TheTraveler/Chapter 8- The Law of Cause and Effect.html'),
    "new-traveler-ch9": require('../resources/TheTraveler/Chapter 9- Question and Answers.html'),
    "new-traveler-ch10": require('../resources/TheTraveler/Chapter 10- The History of Tathagata.html'),
    //
    "guide-charity-source-kr": pdfEmbedHTML_pdfPath_prefix + require(
        '../resources/TranslatingTathagata-Translations/Guide - Charity - Excerpt/Original Korean Excerpt from Guide - Charity.pdf'
    ) + pdfEmbedHTML_pdfPath_suffix,
    "guide-introduction1-source-kr": pdfEmbedHTML_pdfPath_prefix + require(
        '../resources/TranslatingTathagata-Translations/Guide - Introduction 1 - Excerpt/Original Korean Excerpt from Guide - Introduction1.pdf'
    ) + pdfEmbedHTML_pdfPath_suffix,
    "natureteaching-guide-source-kr": pdfEmbedHTML_pdfPath_prefix + require(
        '../resources/TranslatingTathagata-Translations/natureteaching.com - guide - teaching/Teaching.pdf'
    ) + pdfEmbedHTML_pdfPath_suffix,

    "tathagata-appear-source-kr": pdfEmbedHTML_pdfPath_prefix + require(
        '../resources/TranslatingTathagata-Translations/TATHAGATA - Appear - 1chul_hyun/Original Korean Article from - TATHAGATA - appear - 1chul_hyun.pdf'
    ) + pdfEmbedHTML_pdfPath_suffix,

    //
    "books-lamentation-photos": imageEmbedHTML_imageEls_prefix + imageElsHTMLStringFrom([
        require('../resources/TranslatingTathagata-Translations/Books - Lamentation/book_250.jpg'),
        require('../resources/TranslatingTathagata-Translations/Books - Lamentation/book_a129.jpg')
    ], null) + imageEmbedHTML_imageEls_suffix,
    //
    "books-lonely-struggle-photos": imageEmbedHTML_imageEls_prefix + imageElsHTMLStringFrom([
        require('../resources/TranslatingTathagata-Translations/Books - Lonely Struggle/book_245.jpg'),
        require('../resources/TranslatingTathagata-Translations/Books - Lonely Struggle/book_a.jpg'),
        require('../resources/TranslatingTathagata-Translations/Books - Lonely Struggle/book_a150.jpg'),
        require('../resources/TranslatingTathagata-Translations/Books - Lonely Struggle/book_b.jpg'),
        require('../resources/TranslatingTathagata-Translations/Books - Lonely Struggle/book_b150.jpg')
    ], null) + imageEmbedHTML_imageEls_suffix,
    //
    "tathagata-photos-gallery": imageEmbedHTML_imageEls_suffix + imageElsHTMLStringFrom([
        require("../resources/Gallery/02_001.jpg"),
        require("../resources/Gallery/lastscan1.jpg"),
        require("../resources/Gallery/14.jpg"),
        require("../resources/Gallery/19981029_1.jpg"),
        require("../resources/Gallery/oxforf1997.jpg"),
        require("../resources/Gallery/20000526_1.jpg"),
        require("../resources/Gallery/20000524_3.jpg"),
        require("../resources/Gallery/20000625_1.jpg"),
        require("../resources/Gallery/20020619_1.jpg"),
        require("../resources/Gallery/portrait_07.jpg"),
        require("../resources/Gallery/portrait_08.jpg"),
        require("../resources/Gallery/photo 003.jpg"),
        require("../resources/Gallery/photo 123.jpg"),
        require("../resources/Gallery/photo 231.jpg"),
        require("../resources/Gallery/______ 033.jpg")
    ], [
        "Master Tathagata, Soyun, and David at Leicester Square.",
        "Tathagata in Bodh Gaya in 1994.",
        "India, 1997.",
        "Maharashtra Institute of Technology, 1998.",
        "At Oxford University in 1998.",
        "May 24, 2000.",
        "May 26, 2000.",
        "June 25, 2000 in Hyde Park, London.",
        "Barking, UK on June 19, 2002.",
        "Portrait from 2004.",
        "Portrait of Tathagata from 2006.",
        "Hollywood, 2007.",
        "Columbia University, 2007.",
        "New York University, 2007.",
        "Tathagata lecturing in Busan, 2007."
    ]) + imageEmbedHTML_imageEls_suffix,
    //
    "tathagata-message-basis-and-foundation-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Basis and Foundation (February 23, 1993)] keunbon/Original Korean Article from - TATHAGATA - message - keunbon.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-buddhas-way-feb23-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Buddha\'s Way (February 23, 1993)] bookchukil/Original Korean Article from - TATHAGATA - message - bookchukil.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-buddhas-way-jan5-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Buddha\'s Way (January 5, 1989)] bookchukil2/Original Korean Article from - TATHAGATA - message - bookchukil2.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-end-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [End of the World Phenomenon and the End] malsae1/Original Korean Article from - TATHAGATA - message - malsae1.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-foolishness-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Foolishness and Enlightenment (February 23, 1993)] moojiwa/Original Korean Article from - TATHAGATA - message - moojiwa.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-i-am-a-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [I Am a Scientist Who Studies Behavior of the Natural World] jayun/Original Korean Article from - TATHAGATA - message - jayun.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-i-want-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [I Want to Provide Answers to This Question] daedap2/Original Korean Article from - TATHAGATA - message - daedap2.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-i-will-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [I Will Answer Any of Your Questions] daedap/Original Korean Article from - TATHAGATA - message - daedap.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-in-todays-world-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [In Today’s World, What Is the Problem (January 1, 1996)] moonjae/Original Korean Article from - TATHAGATA - message - moonjae.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-meaning-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Meaning (Janury 28, 1990)] chunjiman/Original Korean Article from - TATHAGATA - message - chunjiman.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-righteous-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Righteous Person (February 23, 1993)] jinsilhanja/Original Korean Article from - TATHAGATA - message - jinsilhanja.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-the-most-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [The Most Feared Adversary is Indifference (October 1990)] juk/Original Korean Article from - TATHAGATA - message - juk.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-the-square-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [The Square of Truth (October 1990)] gwangjang/Original Korean Article from - TATHAGATA - message - gwangjang.pdf') + pdfEmbedHTML_pdfPath_suffix,
    "tathagata-message-truth-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Truth and Truthfulness (Febraury 23, 1993)] jinri/Original Korean Article from - TATHAGATA - message - jinri.pdf') + pdfEmbedHTML_pdfPath_suffix,
    //
    "teaching-9ho-source-kr": pdfEmbedHTML_pdfPath_prefix + require('../resources/TranslatingTathagata-Translations/Teaching - 9ho - Daedam9 - Full Article/Original Korean Article from teaching - 9ho - daedam9.pdf') + pdfEmbedHTML_pdfPath_suffix,
}
//
export function htmlForId(html_id: string)
{
    return htmls_by_id[html_id]
}
//
//
const pathsFor_mds_by_html_id: { [key: string]: string} = 
{
    "transcriptions-intro": require('../resources/specific/Transcriptions_README_modifiedForApp.md'),
    "precepts-commentary": require('../resources/transcriptions/commentary on sixteen precepts.md'),
    "traveler-background-from-publisher": require('../resources/specific/traveler-background-from-publisher.md'),
    //
    "ai-translations-traveler-jun25": require('../resources/ai/ai-translations-traveler-jun25.md'),
    //
    // translations
    "new-translations-intro": require('../resources/specific/Translations_intro.md'),

    "books-lamentation": require('../resources/TranslatingTathagata-Translations/Books - Lamentation/Lamentation - English - translated by J_lee_77777.txt'),
    "books-lamentation-original-kr": require('../resources/specific/Original Korean - Lamentation - Hantan.md'),
    "lamentation-background-1": require('../resources/TranslatingTathagata-Translations/Books - Lamentation/Background.md'),
    "tathagata-teaching-precepts-background": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Precepts/Background.md'),

    "books-lonely-struggle-background": require('../resources/TranslatingTathagata-Translations/Books - Lonely Struggle/Background.md'),
    "books-lonely-struggle-intro": require('../resources/TranslatingTathagata-Translations/Books - Lonely Struggle/Lonely Struggle - Introduction - English translation by JL.txt'),
    "books-lonely-struggle-ch30": require('../resources/TranslatingTathagata-Translations/Books - Lonely Struggle/Lonely Struggle - Ch 30 and Epilogue - English translated by JL.txt'),
    "books-lonely-struggle-intro-original-kr": require('../resources/TranslatingTathagata-Translations/Books - Lonely Struggle/Original Korean - Lonely Struggle introduction.txt'),
    "books-lonely-struggle-ch30-original-kr": require('../resources/TranslatingTathagata-Translations/Books - Lonely Struggle/Original Korean - Lonely Struggle - Ch 30 and Epilogue.txt'),

    "guide-charity-jl": require('../resources/TranslatingTathagata-Translations/Guide - Charity - Excerpt/Charity Excerpt Translated by J_Lee_77777.md'),
    "guide-charity-park_jihyeon": require('../resources/TranslatingTathagata-Translations/Guide - Charity - Excerpt/Charity Excerpt Translated by park_jihyeon.md'),
    "guide-introduction1": require('../resources/TranslatingTathagata-Translations/Guide - Introduction 1 - Excerpt/Introduction1 Excerpt Translated by J_Lee_77777.md'),

    "natureteaching-no8-qa": require('../resources/TranslatingTathagata-Translations/natureteaching - No.8 - Correspondent Report Q&A/Translation by Olivia on Mar 7 2019 of 02-16-1999 - Keble College - Philosophy Society QA.txt'),
    "natureteaching-no8-background": require('../resources/TranslatingTathagata-Translations/natureteaching - No.8 - Correspondent Report Q&A/Translation Background.md'),
    "natureteaching-no8-source-kr": require('../resources/TranslatingTathagata-Translations/natureteaching - No.8 - Correspondent Report Q&A/Original Korean text - 02-16-1999 - Keble College - Philosophy Society QA.txt'),
    
    "natureteaching-guide": require('../resources/specific/natureteaching.com - guide - teaching/Teaching.txt'),

    "tathagata-appear": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Appear - 1chul_hyun/1chul_hyun Translated by J_Lee_77777.md'),

    "tathagata-message-basis-and-foundation": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Basis and Foundation (February 23, 1993)] keunbon/Keunbon Translated by J_Lee_77777.md'),
    "tathagata-message-buddhas-way-feb23": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Buddha\'s Way (February 23, 1993)] bookchukil/Boochukil Translated by J_Lee_77777.md'),
    "tathagata-message-buddhas-way-jan5": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Buddha\'s Way (January 5, 1989)] bookchukil2/bookchukil2 Translated by J_Lee_77777.md'),
    "tathagata-message-end": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [End of the World Phenomenon and the End] malsae1/Malsae1 Translated by J_Lee_77777.md'),
    "tathagata-message-foolishness": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Foolishness and Enlightenment (February 23, 1993)] moojiwa/Moojiwa Translated by J_Lee_77777.md'),
    "tathagata-message-i-am-a": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [I Am a Scientist Who Studies Behavior of the Natural World] jayun/Jayun Translated by J_Lee_77777.md'),
    "tathagata-message-i-want": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [I Want to Provide Answers to This Question] daedap2/Daedap2 Translated by J_Lee_77777.md'),
    "tathagata-message-i-will": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [I Will Answer Any of Your Questions] daedap/Daedap Translated by J_Lee_77777.md'),
    "tathagata-message-in-todays-world": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [In Today’s World, What Is the Problem (January 1, 1996)] moonjae/Moonjae Translated by J_Lee_77777.md'),
    "tathagata-message-meaning": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Meaning (Janury 28, 1990)] chunjiman/Chunjiman Translated by J_Lee_77777.md'),
    "tathagata-message-righteous": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Righteous Person (February 23, 1993)] jinsilhanja/Jinsilhanja Translated by J_Lee_77777.md'),
    "tathagata-message-the-most": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [The Most Feared Adversary is Indifference (October 1990)] juk/Juk Translated by J_Lee_77777.md'),
    "tathagata-message-the-square": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [The Square of Truth (October 1990)] gwangjang/Gwangjang Translated by J_Lee_77777.md'),
    "tathagata-message-truth": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Truth and Truthfulness (Febraury 23, 1993)] jinri/Jinri Translated by J_Lee_77777.md'),

    "tathagata-teaching-effort": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Effort [nolyuk]/English - Teaching - Effort (nolyuk) - translated by JL.txt'),
    "tathagata-teaching-prayer-kido": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Prayer [kido]/English - Teaching - Prayer - translated by JL.txt'),
    "tathagata-teaching-prayer-penitence-hope": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Prayer of penitence and prayer of hope [chamhoi]/English - Teaching - Prayer of penitence and prayer of hope - translated by JL.txt'),
    "tathagata-teaching-precepts": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Precepts/Precepts translated by J_lee_77777.txt'),

    
    "tathagata-teaching-road-background": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Road to Enlightenment 1, 2, 3, 4/Background Info.txt'),

    "tathagata-teaching-words-background": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Words/Background Info.txt'),
    

    "tathagata-teaching-road1": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Road to Enlightenment 1, 2, 3, 4/English - Teaching - Road to Enlightenment (load_1) - translated by JL.txt'),
    "tathagata-teaching-road2": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Road to Enlightenment 1, 2, 3, 4/English - Teaching - Road to Enlightenment (load_2) - translated by JL.txt'),
    "tathagata-teaching-road3": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Road to Enlightenment 1, 2, 3, 4/English - Teaching - Road to Enlightenment (load_3) - translated by JL.txt'),
    "tathagata-teaching-road4": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Road to Enlightenment 1, 2, 3, 4/English - Teaching - Road to Enlightenment (load_4) - translated by JL.txt'),
    "tathagata-teaching-transcendence": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Transcendence [chowol]/English - Teaching - Transcendence (chowol) - translated by JL.txt'),
    "tathagata-teaching-words": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Words/English - Teaching - Words - translated by JL.txt'),

    "teaching-9ho": require('../resources/TranslatingTathagata-Translations/Teaching - 9ho - Daedam9 - Full Article/Daedam9 Translated by J_Lee_77777.md'),
    //
    //
    "books-lamentation-source-info": require('../resources/TranslatingTathagata-Translations/Books - Lamentation/Source Info.txt'),
    "books-lonely-struggle-source-info": require('../resources/TranslatingTathagata-Translations/Books - Lonely Struggle/Source Info.txt'),
    "guide-charity-source-info": require('../resources/TranslatingTathagata-Translations/Guide - Charity - Excerpt/Source Info.txt'),
    "guide-introduction1-source-info": require('../resources/TranslatingTathagata-Translations/Guide - Introduction 1 - Excerpt/Source Info.txt'),
    "natureteaching-no8-qa-source-info": require('../resources/TranslatingTathagata-Translations/natureteaching - No.8 - Correspondent Report Q&A/Source Info.md'),
    "natureteaching-guide-source-info": require('../resources/TranslatingTathagata-Translations/natureteaching.com - guide - teaching/Source Info.md'),
    "tathagata-appear-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Appear - 1chul_hyun/Source Info.txt'),
    "tathagata-message-basis-and-foundation-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Basis and Foundation (February 23, 1993)] keunbon/Source Info.txt'),
    "tathagata-message-buddhas-way-feb23-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Buddha\'s Way (February 23, 1993)] bookchukil/Source Info.txt'),
    "tathagata-message-buddhas-way-jan5-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Buddha\'s Way (January 5, 1989)] bookchukil2/Source Info.txt'),
    "tathagata-message-end-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [End of the World Phenomenon and the End] malsae1/Source Info.txt'),
    "tathagata-message-foolishness-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Foolishness and Enlightenment (February 23, 1993)] moojiwa/Source Info.txt'),
    "tathagata-message-i-am-a-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [I Am a Scientist Who Studies Behavior of the Natural World] jayun/Source Info.txt'),
    "tathagata-message-i-want-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [I Want to Provide Answers to This Question] daedap2/Source Info.txt'),
    "tathagata-message-i-will-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [I Will Answer Any of Your Questions] daedap/Source Info.txt'),
    "tathagata-message-in-todays-world-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [In Today’s World, What Is the Problem (January 1, 1996)] moonjae/Source Info.txt'),
    "tathagata-message-meaning-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Meaning (Janury 28, 1990)] chunjiman/Source Info.txt'),
    "tathagata-message-righteous-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Righteous Person (February 23, 1993)] jinsilhanja/Source Info.txt'),
    "tathagata-message-the-most-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [The Most Feared Adversary is Indifference (October 1990)] juk/Source Info.txt'),
    "tathagata-message-the-square-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [The Square of Truth (October 1990)] gwangjang/Source Info.txt'),
    "tathagata-message-truth-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - message - [Truth and Truthfulness (Febraury 23, 1993)] jinri/Source Info.txt'),
    "tathagata-teaching-effort-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Effort [nolyuk]/Source Info.txt'),
    "tathagata-teaching-prayer-kido-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Prayer [kido]/Source Info.txt'),
    "tathagata-teaching-prayer-penitence-hope-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Prayer of penitence and prayer of hope [chamhoi]/Source Info.txt'),
    "tathagata-teaching-precepts-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Precepts/Source Info.txt'),
    "tathagata-teaching-road-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Road to Enlightenment 1, 2, 3, 4/Source Info.txt'),
    "tathagata-teaching-transcendence-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Transcendence [chowol]/Source Info.txt'),
    "tathagata-teaching-words-source-info": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Words/Source Info.txt'),
    "teaching-9ho-source-info": require('../resources/TranslatingTathagata-Translations/Teaching - 9ho - Daedam9 - Full Article/Source Info - daedam9.txt'),
    //
    "tathagata-teaching-effort-source-kr": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Effort [nolyuk]/Original Korean - Teaching - nolyuk.txt'),
    "tathagata-teaching-prayer-kido-source-kr": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Prayer [kido]/Original Korean - Teaching - Prayer.txt'),
    "tathagata-teaching-prayer-penitence-hope-source-kr": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Prayer of penitence and prayer of hope [chamhoi]/Original Korean - Teaching - Prayer of penitence and prayer of hope.txt'),
    "tathagata-teaching-precepts-source-kr": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Precepts/Original Korean - Precepts 1989-08-16,23.txt'),
    "tathagata-teaching-road1-source-kr": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Road to Enlightenment 1, 2, 3, 4/Original Korean - Teaching - Road to Enlightenment (load_1).txt'),
    "tathagata-teaching-road2-source-kr": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Road to Enlightenment 1, 2, 3, 4/Original Korean - Teaching - Road to Enlightenment (load_2).txt'),
    "tathagata-teaching-road3-source-kr": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Road to Enlightenment 1, 2, 3, 4/Original Korean - Teaching - Road to Enlightenment (load_3).txt'),
    "tathagata-teaching-road4-source-kr": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Road to Enlightenment 1, 2, 3, 4/Original Korean - Teaching - Road to Enlightenment (load_4).txt'),
    "tathagata-teaching-transcendence-source-kr": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Transcendence [chowol]/Original Korean - Teaching - chowol.txt'),
    "tathagata-teaching-words-source-kr": require('../resources/TranslatingTathagata-Translations/TATHAGATA - Teaching - Words/Original Korean - Teaching - Words.txt')

}
let md_converter = new showdown.Converter();
async function hydrate_mds()
{
    let md_ids = Object.keys(pathsFor_mds_by_html_id)
    let promises__fetch: any[] = []
    for (var i = 0 ; i < md_ids.length ; i++) {
        let md_id = md_ids[i]
        let pathFor_md = pathsFor_mds_by_html_id[md_id]
        try {
            let promise = fetch(pathFor_md, { credentials: "same-origin" }) // kick off fetches in parallel
            promises__fetch.push(promise)
        } catch (e) {
            console.error("Unable to make fetch promise for the md file at id", md_id)
        }
    }
    for (var i = 0 ; i < md_ids.length ; i++) {
        let md_id = md_ids[i]
        let pathFor_md = pathsFor_mds_by_html_id[md_id]
        try {
            let res = await promises__fetch[i]
            let raw_str = await res.text()
            let html_str: string
            if (pathFor_md.endsWith(".md")) {
                html_str = md_converter.makeHtml(raw_str) // raw_str is actually md_str
            } else { 
                if (pathFor_md.endsWith(".txt") != true) {
                    console.warn("Non-txt, non-md file passed to hydrate_mds()")
                }
                html_str = raw_str.replace(/\n/g,'<br/>')
            }
            htmls_by_id[md_id] = html_str
        } catch (e) {
            console.error("Unable to fetch or convert the md file at id", md_id)
        }
    }
}
//
//
export const content_map: { [key: string]: ContentMapElement[] } = 
{
    "home": [
        {
            cell: "An Introduction to Tathagata's Enlightenment",
            html_id: "intro-from-publisher"
        },
        {
            cell: "Message From Master Tathagata",
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
            cell: "Travel Accounts by Members",
            list_id: "travel-notes"
        },
        {
            cell: "About Tathagata",
            list_id: "about-tathagata"
        },
        {
            cell: "Q&A with Tathagata from Website Visitors",
            list_id: "q-a"
        },
        {
            cell: "Transcripts of Travel Recordings",
            list_id: "transcriptions"
        },
        {
            cell: "New Translations",
            list_id: "new-translations"
        },
        {
            cell: "AI Translations",
            list_id: "ai-translations"
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
			cell: "Teaching of Tathagata",
			descr: "The Truth",
			html_id: "teaching"
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
		},
        {
			cell: "Places of Lecture",
			descr: "",
			html_id: "places"
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
		}
    ],
    "pubs": [
		{
			cell: "Enlightenment",
			descr: "Tathagata's book Enlightenment",
			list_id: "enlightenment-book"
		},
        {
			cell: "Traveler",
			descr: "Poetry",
			list_id: "traveler"
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
            cell: "Background on This Translation",
            descr: "From This Publisher",
            html_id: "traveler-background-from-publisher"
        },
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
			// descr: "",
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
			// descr: "",
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
		},
        {
            cell: "Photo Gallery",
            descr: "A small collection from various websites",
            html_id: "tathagata-photos-gallery"
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
    "transcriptions": [
        {
            cell: "Introduction to Travel Audio Recording Transcriptions",
            descr: "From This Publisher",
            html_id: "transcriptions-intro"
        },
        {
            cell: "Tathagata QA while traveling the USA",
            descr: "",
            html_id: "tathagata-qa-while-traveling-the-usa"
        },
        {
            cell: "Conversation with a gravity specialist",
            descr: "",
            html_id: "conversation-with-a-gravity-specialist"
        },
        {
            cell: "During a discussion with a cognitive scientist",
            descr: "",
            html_id: "during-a-discussion-with-a-cognitive-scientis"
        },
        {
            cell: "Dialogue with a professor of philosophy",
            descr: "",
            html_id: "dialogue-with-a-professor-of-philosophy"
        },
        {
            cell: "Tathagata meets a professor",
            descr: "",
            html_id: "tathagata-meets-a-professor"
        },
        {
            cell: "Meeting at a climate research funding organization",
            descr: "",
            html_id: "tathagata-meets-an-assistant-director-at-an-e"
        },
        {
            cell: "Economy talk at Tathagata's hotel accommodation",
            descr: "During Thailand travel, 2004",
            html_id: "economy-talk-in-tathagatas-hotel-accommodatio"
        },
        {
            cell: "A Buddhist monk visiting Master Tathagata",
            descr: "At His hotel accommodation in Thailand upon receiving invitation through Soyun and Satto",
            html_id: "an-american-buddhist-monk-visits-master-tatha"
        },
        {
            cell: "Tathagata visits a Catholic church",
            descr: "",
            html_id: "tathagata-meets-a-catholic-nun"
        },
        {
            cell: "Conversation with the director of a Buddhist university",
            descr: "",
            html_id: "conversation-with-the-director-of-a-buddhist"
        },
        {
            cell: "Conversations with three professors of philosophy and religion",
            descr: "",
            html_id: "conversations-with-three-professors-of-philos"
        },
        {
            cell: "Explanation about the subjects of death, the world after life, and transmigration",
            descr: "",
            html_id: "explanation-about-the-subjects-of-death-the-w"
        },
        {
            cell: "Meeting Buddhist monks in Thailand",
            descr: "",
            html_id: "meeting-buddhist-monks-in-thailand"
        },
        {
            cell: "Tathagata giving a private talk at a hotel where he stayed in Thailand",
            descr: "",
            html_id: "tathagata-giving-a-talk-in-thailand"
        },
        {
            cell: "Master Tathagata meets a global climate expert",
            descr: "",
            html_id: "master-tathagata-meets-a-global-climate-exper"
        },
        {
            cell: "Master Tathagata meets a philosophy professor in America",
            descr: "",
            html_id: "master-tathagata-meets-a-philosophy-professor"
        },
        {
            cell: "Meeting in the philosophy department",
            descr: "",
            html_id: "meeting-in-the-philosophy-department"
        },
        {
            cell: "Tathagata during hotel room talk",
            descr: "",
            html_id: "tathagata-during-hotel-room-talk"
        },
        {
            cell: "Satto asks Master Tathagata about dreams",
            descr: "",
            html_id: "satto-asks-master-tathagata-about-dreams"
        },
        {
            cell: "From meeting at a Catholic Church",
            descr: "",
            html_id: "from-meeting-at-a-catholic-church"
        },
        {
            cell: "During the last part of a conversation with a professor of linguistics",
            descr: "",
            html_id: "last-part-of-a-conversation-with-a-professor"
        },
        {
            cell: "While Soyun talks to Satto",
            descr: "",
            html_id: "while-soyun-talks-to-satto"
        },
        {
            cell: "Meeting a brain & cognitive science specialist",
            descr: "",
            html_id: "meeting-a-brain-cognitive-science-specialist"
        },
        {
            cell: "Lunch at a Buddhist temple",
            descr: "",
            html_id: "lunch-at-a-buddhist-temple"
        },
        {
            cell: "At a university's international affairs office in Asia",
            descr: "",
            html_id: "at-a-universitys-international-affairs-office"
        },
        {
            cell: "Tathagata Quotes",
            descr: "A collection of quotes I wrote down",
            html_id: "transcription-tathagata-quotes"
        },
        {
            cell: "Malaysia - August 13th, 2008",
            descr: "",
            html_id: "malaysia-august-13th-2008"
        },
        {
            cell: "Meeting in the philosophy department, Part 2",
            descr: "",
            html_id: "meeting-in-the-philosophy-department-part-2"
        },
        {
            cell: "Meeting in the Philosophy Department, Part 3",
            descr: "",
            html_id: "meeting-in-the-philosophy-department-part-3"
        },
        {
            cell: "During a talk with a cognitive scientist",
            descr: "",
            html_id: "during-a-talk-with-a-cognitive-scientist"
        },
        {
            cell: "Brief talk with a lay practitioner",
            descr: "",
            html_id: "brief-talk-with-a-lay-practitioner"
        },
        {
            cell: "Beginning discussion with a primate cognition scientist",
            descr: "",
            html_id: "beginning-discussion-with-a-primate-cognition"
        },
        {
            cell: "Visiting a Buddhist university",
            descr: "",
            html_id: "visiting-a-buddhist-university"
        },
        {
            cell: "Soyun's Commentary on the 'Sixteen Precepts' from Tathagata",
            descr: "These precepts can be found in the 'New Translations' section",
            html_id: "precepts-commentary"
        },
    ],
    "ai-translations": [
        {
            cell: "Books - Traveler",
            descr: "Translated by AI in June 2025 after training on Tathagata's English biography",
            html_id: "ai-translations-traveler-jun25"
        }
    ],
    "new-translations": [
        {
            cell: "Introduction to These New Translations",
            descr: "Context, Background, Disclaimer, Legal",
            html_id: "new-translations-intro"
        },
        {
            cell: "Books - Poetry: The Traveler",
            descr: "A new translation by two trained seekers",
            list_id: "books-traveler-new"
        },
        {
            cell: "Books - Poetry: Lamentation",
            descr: "May have been written before the recovery of His enlightenment",
            list_id: "books-lamentation"
        },
        {
            cell: "Books - Autobiography: Lonely Struggle",
            list_id: "books-lonely-struggle"
        },
        {
            cell: "Guide - Charity - Excerpt",
            descr: "Assumed prepared by Soyun",
            list_id: "guide-charity"
        },
        {
            cell: "Guide - Introduction 1 - Excerpt",
            descr: "Assumed prepared by Soyun",
            list_id: "guide-introduction1"
        },
        {
            cell: "natureteaching.com - guide - teaching",
            descr: "Assumed prepared by Soyun",
            list_id: "natureteaching-guide"
        },
        {
            cell: "natureteaching - No.8 - Correspondent Report Q&A",
            list_id: "natureteaching-no8-qa"
        },
        {
            cell: "TATHAGATA - Appear - 1chul_hyun",
            list_id: "tathagata-appear"
        },
        {
            cell: "TATHAGATA - message - [Basis and Foundation (February 23, 1993)] keunbon",
            list_id: "tathagata-message-basis-and-foundation"
        },
        {
            cell: "TATHAGATA - message - [Buddha's Way (January 5, 1989)] bookchukil2",
            list_id: "tathagata-message-buddhas-way-jan5"
        },
        {
            cell: "TATHAGATA - message - [Buddha's Way (February 23, 1993)] bookchukil",
            list_id: "tathagata-message-buddhas-way-feb23"
        },
        {
            cell: "TATHAGATA - message - [End of the World Phenomenon and the End] malsae1",
            list_id: "tathagata-message-end"
        },
        {
            cell: "TATHAGATA - message - [Foolishness and Enlightenment (February 23, 1993)] moojiwa",
            list_id: "tathagata-message-foolishness"
        },
        {
            cell: "TATHAGATA - message - [I Am a Scientist Who Studies Behavior of the Natural World] jayun",
            list_id: "tathagata-message-i-am-a"
        },
        {
            cell: "TATHAGATA - message - [I Want to Provide Answers to This Question] daedap2",
            list_id: "tathagata-message-i-want"
        },
        {
            cell: "TATHAGATA - message - [I Will Answer Any of Your Questions] daedap",
            list_id: "tathagata-message-i-will"
        },
        {
            cell: "TATHAGATA - message - [In Today’s World, What Is the Problem (January 1, 1996)] moonjae",
            list_id: "tathagata-message-in-todays-world"
        },
        {
            cell: "TATHAGATA - message - [Meaning (Janury 28, 1990)] chunjiman",
            list_id: "tathagata-message-meaning"
        },
        {
            cell: "TATHAGATA - message - [Righteous Person (February 23, 1993)] jinsilhanja",
            list_id: "tathagata-message-righteous"
        },
        {
            cell: "TATHAGATA - message - [The Most Feared Adversary is Indifference (October 1990)] juk",
            list_id: "tathagata-message-the-most"
        },
        {
            cell: "TATHAGATA - message - [The Square of Truth (October 1990)] gwangjang",
            list_id: "tathagata-message-the-square"
        },
        {
            cell: "TATHAGATA - message - [Truth and Truthfulness (Febraury 23, 1993)] jinri",
            list_id: "tathagata-message-truth"
        },
        {
            cell: "TATHAGATA - Teaching - Effort [nolyuk]",
            list_id: "tathagata-teaching-effort"
        },
        {
            cell: "TATHAGATA - Teaching - Prayer [kido]",
            list_id: "tathagata-teaching-prayer-kido"
        },
        {
            cell: "TATHAGATA - Teaching - Prayer of penitence and prayer of hope [chamhoi]",
            list_id: "tathagata-teaching-prayer-penitence-hope"
        },
        {
            cell: "TATHAGATA - Teaching - Precepts",
            list_id: "tathagata-teaching-precepts"
        },
        {
            cell: "TATHAGATA - Teaching - Road to Enlightenment 1, 2, 3, 4",
            list_id: "tathagata-teaching-road"
        },
        {
            cell: "TATHAGATA - Teaching - Transcendence [chowol]",
            list_id: "tathagata-teaching-transcendence"
        },
        {
            cell: "TATHAGATA - Teaching - Words",
            list_id: "tathagata-teaching-words"
        },
        {
            cell: "Teaching - 9ho - Daedam9 - Full Article",
            list_id: "teaching-9ho"
        }
    ],
    "books-traveler-new": [
        {
            cell: "Introduction to This Translation",
            descr: "Foreword by This Publisher",
            html_id: "new-traveler-foreword"
        },
        {
            cell: "Chapter 1: Dearest Wish",
            descr: "There was no place to dedicate conscience and courage again,/In front of a man who has lived in suffering./Because of love towards his fatherland,/The solitary song of a man who had to walk along a lonely path, passed/by burning his young heart.",
            html_id: "new-traveler-ch1"
        },
        {
            cell: "Chapter 2: Forgotten Time",
            descr: "Where should I meet the true world?/I did not have the place to ask it./I would rather have wished/That the dark time was a dream.",
            html_id: "new-traveler-ch2"
        },
        {
            cell: "Chapter 3: The Story of Yunhwa [Lotus] Island",
            descr: "An innocent man had to see a sin/Was heaven's meaning./Because there was no place to hide his mind,/He who had to confine himself to a solitary island/Lamented as following.",
            html_id: "new-traveler-ch3"
        },
        {
            cell: "Chapter 4: The Sound of Heaven",
            descr: "A new world appeared in my calm mind./I saw myself,/who had neither anguish nor fantasy./In my lonely heart,/the sound of heaven was heard.",
            html_id: "new-traveler-ch4"
        },
        {
            cell: "Chapter 5: Traveler",
            descr: "Heaven burdened me./Nobody could bear that burden rather than me./So I had to wander around the world again.",
            html_id: "new-traveler-ch5"
        },
        {
            cell: "Chapter 6: A Grain of Seed",
            descr: "Soyun./This is the name/That I gave to the world for the first time./After having given this name,/I told her all my secrets.",
            html_id: "new-traveler-ch6"
        },
        {
            cell: "Chapter 7: Deploration",
            descr: "This is the song/Which I have been singing,/Seeing myself, the one who has no place to go and stay./Heaven! Please let me find righteous people today./And please let them cause a new world to come into being.",
            html_id: "new-traveler-ch7"
        },
        {
            cell: "Chapter 8: The Law of Cause and Effect",
            descr: "The law of cause and effect is the eternal promise that exists in our world./We call this promise truth./I will explain things of the world by this law.",
            html_id: "new-traveler-ch8"
        },
        {
            cell: "Chapter 9: Question and Answers",
            descr: "There is something we can not believe in the world./However, as time goes by, people come to know such a thing./And then it is clear that truth and falsehood can be proven by a fact.",
            html_id: "new-traveler-ch9"
        },
        {
            cell: "Chapter 10: The History of Tathagata",
            descr: "Truth exists forever./If apples do not look like apples,/If apples do not taste like apple/We can not call them apples.",
            html_id: "new-traveler-ch10"
        }
    ],
    "books-lamentation": [
        {
            cell: "Background on This Translation",
            html_id: "lamentation-background-1"
        },
        {
            cell: "Photos",
            html_id: "books-lamentation-photos"
        },
        {
            cell: "Books - Lamentation",
            descr: "English Translation by JL",
            html_id: "books-lamentation"
        },
        {
            cell: "Source Info",
            html_id: "books-lamentation-source-info"
        },
        {
            cell: "Lamentation - Korean Source",
            html_id: "books-lamentation-original-kr"
        }
    ],    
    "books-lonely-struggle": [
        {
            cell: "Background on This Translation",
            descr: "From This Publisher",
            html_id: "books-lonely-struggle-background"
        },
        {
            cell: "Photos",
            html_id: "books-lonely-struggle-photos"
        },
        {
            cell: "Lonely Struggle - Introduction",
            descr: "English Translation by JL",
            html_id: "books-lonely-struggle-intro"
        },
        {
            cell: "Lonely Struggle - Ch 30 and Epilogue",
            descr: "English Translation by JL",
            html_id: "books-lonely-struggle-ch30"
        },
        {
            cell: "Source Info",
            html_id: "books-lonely-struggle-source-info"
        },
        {
            cell: "Lonely Struggle - Introduction - Korean Source",
            html_id: "books-lonely-struggle-intro-original-kr"
        },
        {
            cell: "Lonely Struggle - Ch 30 and Epilogue - Korean Source",
            html_id: "books-lonely-struggle-ch30-original-kr"
        },
    ],
    "guide-charity": [
        {
            cell: "Charity - Excerpt",
            descr: "English Translation by J_Lee_77777",
            html_id: "guide-charity-jl"
        },
        {
            cell: "Charity - Excerpt",
            descr: "English Translation by park_jihyeon",
            html_id: "guide-charity-park_jihyeon"
        },
        {
            cell: "Source Info",
            html_id: "guide-charity-source-info"
        },
        {
            cell: "Charity - Excerpt - Korean Source",
            html_id: "guide-charity-source-kr"
        }
    ],
    "guide-introduction1": [
        {
            cell: "Guide - Introduction 1 - Excerpt",
            descr: "English Translation by J_Lee_77777",
            html_id: "guide-introduction1"
        },
        {
            cell: "Source Info",
            html_id: "guide-introduction1-source-info"
        },
        {
            cell: "Guide - Introduction 1 - Excerpt - Korean Source",
            descr: "Assumed authored by Soyun",
            html_id: "guide-introduction1-source-kr"
        }
    ],
    "natureteaching-no8-qa": [
        {
            cell: "Background on This Translation",
            html_id: "natureteaching-no8-background"
        },
        {
            cell: "Keble College - Philosophy Society QA on 02-16-1999",
            descr: "English Translation by Olivia",
            html_id: "natureteaching-no8-qa"
        },
        {
            cell: "Source Info",
            html_id: "natureteaching-no8-qa-source-info"
        },
        {
            cell: "Keble College - 02-16-1999 - Korean Source",
            html_id: "natureteaching-no8-source-kr"
        }
    ],
    "natureteaching-guide": [
        {
            cell: "natureteaching.com - guide - teaching",
            descr: "English Translation",
            html_id: "natureteaching-guide"
        },
        {
            cell: "Source Info",
            html_id: "natureteaching-guide-source-info"
        },
        {
            cell: "natureteaching.com - guide - teaching - Korean Source",
            descr: "Assumed prepared by Soyun",
            html_id: "natureteaching-guide-source-kr"
        }
    ],
    "tathagata-appear": [
        {
            cell: "Buddha's Appearance",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-appear"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-appear-source-info"
        },
        {
            cell: "Buddha's Appearance - Korean Source",
            html_id: "tathagata-appear-source-kr"
        }
    ],
    "tathagata-message-basis-and-foundation": [
        {
            cell: "Message - Basis and Foundation (February 23, 1993)",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-basis-and-foundation"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-basis-and-foundation-source-info"
        },
        {
            cell: "Message - Basis and Foundation - Korean Source",
            html_id: "tathagata-message-basis-and-foundation-source-kr"
        }
    ],
    "tathagata-message-buddhas-way-feb23": [
        {
            cell: "Message - Buddha's Way (February 23, 1993)",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-buddhas-way-feb23"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-buddhas-way-feb23-source-info"
        },
        {
            cell: "Message - Buddha's Way (February 23, 1993) - Korean Source",
            html_id: "tathagata-message-buddhas-way-feb23-source-kr"
        }
    ],
    "tathagata-message-buddhas-way-jan5": [
        {
            cell: "Message - Buddha's Way (January 5, 1989)",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-buddhas-way-jan5"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-buddhas-way-jan5-source-info"
        },
        {
            cell: "Message - Buddha's Way (January 5, 1989) - Korean Source",
            html_id: "tathagata-message-buddhas-way-jan5-source-kr"
        }
    ],
    "tathagata-message-end": [
        {
            cell: "Message - End of the World Phenomenon and the End",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-end"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-end-source-info"
        },
        {
            cell: "Message - End of the World Phenomenon and the End - Korean Source",
            html_id: "tathagata-message-end-source-kr"
        }
    ],
    "tathagata-message-foolishness": [
        {
            cell: "Message - Foolishness and Enlightenment (February 23, 1993)",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-foolishness"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-foolishness-source-info"
        },
        {
            cell: "Message - Foolishness and Enlightenment - Korean Source",
            html_id: "tathagata-message-foolishness-source-kr"
        }
    ],
    "tathagata-message-i-am-a": [
        {
            cell: "Message - I Am a Scientist Who Studies Behavior of the Natural World",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-i-am-a"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-i-am-a-source-info"
        },
        {
            cell: "Message - I Am a Scientist Who Studies Behavior of the Natural World - Korean Source",
            html_id: "tathagata-message-i-am-a-source-kr"
        }
    ],
    "tathagata-message-i-want": [
        {
            cell: "Message - I Want to Provide Answers to This Question",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-i-want"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-i-want-source-info"
        },
        {
            cell: "Message - I Want to Provide Answers to This Question - Korean Source",
            html_id: "tathagata-message-i-want-source-kr"
        }
    ],
    "tathagata-message-i-will": [
        {
            cell: "Message - I Will Answer Any of Your Questions",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-i-will"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-i-will-source-info"
        },
        {
            cell: "Message - I Will Answer Any of Your Questions - Korean Source",
            html_id: "tathagata-message-i-will-source-kr"
        }
    ],
    "tathagata-message-in-todays-world": [
        {
            cell: "Message - In Today's World, What Is the Problem (January 1, 1996)",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-in-todays-world"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-in-todays-world-source-info"
        },
        {
            cell: "Message - In Today's World, What Is the Problem - Korean Source",
            html_id: "tathagata-message-in-todays-world-source-kr"
        }
    ],
    "tathagata-message-meaning": [
        {
            cell: "Message - Meaning (Janury 28, 1990)",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-meaning"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-meaning-source-info"
        },
        {
            cell: "Message - Meaning - Korean Source",
            html_id: "tathagata-message-meaning-source-kr"
        }
    ],
    "tathagata-message-righteous": [
        {
            cell: "Message - Righteous Person (February 23, 1993)",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-righteous"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-righteous-source-info"
        },
        {
            cell: "Message - Righteous Person - Korean Source",
            html_id: "tathagata-message-the-most-source-kr"
        }
    ],
    "tathagata-message-the-most": [
        {
            cell: "Message - The Most Feared Adversary is Indifference (October 1990)",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-the-most"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-the-most-source-info"
        },
        {
            cell: "Message - The Most Feared Adversary is Indifference - Korean Source",
            html_id: "tathagata-message-the-most-source-kr"
        }
    ],
    "tathagata-message-the-square": [
        {
            cell: "Message - The Square of Truth (October 1990)",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-the-square"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-the-square-source-info"
        },
        {
            cell: "Teaching - The Square of Truth - Korean Source",
            html_id: "tathagata-message-the-square-source-kr"
        }
    ],
    "tathagata-message-truth": [
        {
            cell: "Message - Truth and Truthfulness (Febraury 23, 1993)",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-message-truth"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-message-truth-source-info"
        },
        {
            cell: "Message - Truth and Truthfulness - Korean Source",
            html_id: "tathagata-message-truth-source-kr"
        }
    ],
    "tathagata-teaching-effort": [
        {
            cell: "Teaching - Effort",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-teaching-effort"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-teaching-effort-source-info"
        },
        {
            cell: "Teaching - Effort - Korean Source",
            html_id: "tathagata-teaching-effort-source-kr"
        }
    ],
    "tathagata-teaching-prayer-kido": [
        {
            cell: "Teaching - Prayer",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-teaching-prayer-kido"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-teaching-prayer-kido-source-info"
        },
        {
            cell: "Teaching - Prayer - Korean Source",
            html_id: "tathagata-teaching-prayer-kido-source-kr"
        }
    ],
    "tathagata-teaching-prayer-penitence-hope": [
        {
            cell: "Teaching - Prayer of penitence and prayer of hope",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-teaching-prayer-penitence-hope"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-teaching-prayer-penitence-hope-source-info"
        },
        {
            cell: "Teaching - Prayer of penitence and prayer of hope - Korean Source",
            html_id: "tathagata-teaching-prayer-penitence-hope-source-kr"
        }
    ],
    "tathagata-teaching-precepts": [
        {
            cell: "Background on This Translation",
            descr: "From This Publisher",
            html_id: "tathagata-teaching-precepts-background"
        },
        {
            cell: "Teaching - Precepts",
            descr: "English Translation by J_Lee_77777",
            html_id: "tathagata-teaching-precepts"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-teaching-precepts-source-info"
        },
        {
            cell: "Teaching - Precepts - Korean Source",
            html_id: "tathagata-teaching-precepts-source-kr"
        }
    ],
    "tathagata-teaching-road": [
        {
            cell: "Background on These Four Translations",
            descr: "From This Publisher",
            html_id: "tathagata-teaching-road-background"
        },
        {
            cell: "Teaching - Road to Enlightenment 1",
            descr: "English Translation by JL",
            html_id: "tathagata-teaching-road1"
        },
        {
            cell: "Teaching - Road to Enlightenment 2",
            descr: "English Translation by JL",
            html_id: "tathagata-teaching-road2"
        },
        {
            cell: "Teaching - Road to Enlightenment 3",
            descr: "English Translation by JL",
            html_id: "tathagata-teaching-road3"
        },
        {
            cell: "Teaching - Road to Enlightenment 4",
            descr: "English Translation by JL",
            html_id: "tathagata-teaching-road4"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-teaching-road-source-info"
        },
        {
            cell: "Teaching - Road to Enlightenment 1 - Korean Source",
            html_id: "tathagata-teaching-road1-source-kr"
        },
        {
            cell: "Teaching - Road to Enlightenment 2 - Korean Source",
            html_id: "tathagata-teaching-road2-source-kr"
        },
        {
            cell: "Teaching - Road to Enlightenment 3 - Korean Source",
            html_id: "tathagata-teaching-road3-source-kr"
        },
        {
            cell: "Teaching - Road to Enlightenment 4 - Korean Source",
            html_id: "tathagata-teaching-road4-source-kr"
        }
    ],
    "tathagata-teaching-transcendence": [
        {
            cell: "Teaching - Transcendence",
            descr: "English Translation by JL",
            html_id: "tathagata-teaching-transcendence"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-teaching-transcendence-source-info"
        },
        {
            cell: "Teaching - Transcendence - Korean Source",
            html_id: "tathagata-teaching-transcendence-source-kr"
        }
    ],
    "tathagata-teaching-words": [
        {
            cell: "Background Info",
            descr: "From This Publisher",
            html_id: "tathagata-teaching-words-background"
        },
        {
            cell: "Teaching - Words",
            descr: "English Translation by JL",
            html_id: "tathagata-teaching-words"
        },
        {
            cell: "Source Info",
            html_id: "tathagata-teaching-words-source-info"
        },
        {
            cell: "Teaching - Words - Korean Source",
            html_id: "tathagata-teaching-words-source-kr"
        }
    ],
    "teaching-9ho": [
        {
            cell: "Teaching - 9ho - Daedam9 - Full Article",
            descr: "English Translation by J_Lee_77777",
            html_id: "teaching-9ho"
        },
        {
            cell: "Source Info",
            html_id: "teaching-9ho-source-info"
        },
        {
            cell: "Teaching - 9ho - Daedam9 - Korean Source",
            html_id: "teaching-9ho-source-kr"
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
			cell: "silsang.co.kr",
			descr: "",
			url: "http://silsang.co.kr/"
		},
		{
			cell: "www.naturalscience.biz/",
			descr: "",
			url: "http://www.naturalscience.biz/"
		},
		{
			cell: "www.tathagata.info",
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
function __enumerateContentMapElements(fn: (el: ContentMapElement) => any)
{
    let keys = Object.keys(content_map)
    for (var i = 0 ; i < keys.length ; i++) {
        let list = content_map[keys[i]]
        for (var j = 0 ; j < list.length ; j++) {
            let contentMapElement = list[j]
            if (!fn(contentMapElement)) {
                return
            }
        }
    }
}
function _lookedUp_contentMapElementWithFieldOfValue(fieldKey: string, value: string): ContentMapElement
{
    // TODO: memoize this by id?
    let foundEl: ContentMapElement|null = null
    __enumerateContentMapElements((el: ContentMapElement) => {
        if ((el as any)[fieldKey] == value) {
            foundEl = el
            return false
        }
        return true
    })
    if (!foundEl) {
        throw new Error("Expected to find content map element with " + fieldKey + "=" + value)
    }
    return foundEl!
}
export function lookedUp_contentMapElementWithListId(list_id: string): ContentMapElement
{
    // TODO: cache items by list_id?
    return _lookedUp_contentMapElementWithFieldOfValue("list_id", list_id) // using a string for metaprogramming here is not optimal - is there a Typescript best practice for this?
}
export function lookedUp_contentMapElementWithHTMLId(html_id: string): ContentMapElement
{
    // TODO: cache items by html_id?
    return _lookedUp_contentMapElementWithFieldOfValue("html_id", html_id) // using a string for metaprogramming here is not optimal - is there a Typescript best practice for this?
}
//
export const root_list_id = "home"
export let initial_root_list = contentItemListWithId(root_list_id)
//
//
export async function setup_content() // this must be called on boot
{
    await hydrate_mds()
    //
    __enumerateContentMapElements((el: ContentMapElement) => {
        el.runtimeUUID = uuidV4()
        return true
    })
}
