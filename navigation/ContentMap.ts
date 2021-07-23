//
//
//
//
export interface ContentMapElement
{
    cell: string // this is the title to be displayed in the cell
    descr?: string // this is a subtitle to be displayed in the cell
    //
    // -one of the following-
    //
    html_id?: string // this is the html content for an actual leaf page 
    list_id?: string // this is the id of a list if the ContentMapElement is actually a parent to a child list
    url?: string // this is a URL 
}
//
const htmls_by_id: { [key: string]: any } = 
{
    "intro-from-publisher": require('../resources/specific/intro.html'),
    "message": require('../resources/enlightenment/top/message.html'),
    "appearance": require('../resources/enlightenment/about_tathagata/appearance.html')
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
            cell: ""
        },
        {
            cell: ""
        }
    ],
    "pubs": [
        {
            cell: ""
        }
    ],
    "convos": [
        {
            cell: ""
        }
    ],
    "transcriptions": [
        {
            cell: ""
        }
    ],
    "travel-notes": [
        {
            cell: ""
        }
    ],
    "q-a": [
        {
            cell: ""
        }
    ],
    "about-tathagata": [
        {
            cell: "The Life of Tathagata",
            descr: "Appearance of the Enlightened Being",
            html_id: "appearance"
        }
    ],
    "new-translations": [
        {
            cell: ""
        }
    ],
    "links": [
        {
            cell: "Example",
            url: "http://example.com"
        }
    ]
}
export function contentItemListWithId(list_id: string): ContentMapElement[]
{
    return content_map[list_id]
}

export const root_list_id = "home"
export let initial_root_list = contentItemListWithId(root_list_id)
