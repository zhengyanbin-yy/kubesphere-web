export const getClusterUrl = url => {
    let requestURL = url

    const reg = new RegExp(/\/(api|apis|kapis)\/(.*)\/?(klusters\/[^/]*)\/(.*)/)
    const match = requestURL.match(reg)

    if (match && match.length === 5) {
        requestURL = globals.app.isMultiCluster
            ? `/${match[1]}/${match[3].replace('klusters', 'clusters')}/${match[2]}/${
                match[4]
            }`
            : `/${match[1]}/${match[2]}/${match[4]}`
    }

    return requestURL.replace(/\/\/+/, '/')
}

/**
 * parse string without error throw.
 * @param {string} json - json string need to be parsed
 * @param {object} defaultValue - if parse failed, return defaultValue
 */
export const safeParseJSON = (json, defaultValue) => {
    let result
    try {
        result = JSON.parse(json)
    } catch (e) {}

    if (!result && defaultValue !== undefined) {
        return defaultValue
    }
    return result
}