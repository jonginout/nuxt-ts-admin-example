export const state = () => ({
    sidebar: false,
})

export const mutations = {
    TOGGLE_SIDEBAR(defaultState: { sidebar: boolean }) {
        defaultState.sidebar = !defaultState.sidebar
    },
}
