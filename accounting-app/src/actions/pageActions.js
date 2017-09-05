export function setPageTitle(pageTitle="") {
    return {
        type: "CHANGE_PAGE_TITLE",
        payload: pageTitle
    }
}