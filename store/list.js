export const state = () => ({
    dataList: {},
    dataListFiltered: {},
    filters: {
        search: "",
        name: "",
        sort: "id_asc",
    }
  })
  
export const getters = {
    getDataList(state) {
        return state.dataList;
    }
}
  
export const mutations = {
    setDataList (state, response) {
        state.dataList = response
    },
    setDataListFiltered (state, response) {
        state.dataListFiltered = (response === null) ? state.dataList : response;
    },
    setFilters (state, filters) {
        state.filters.search = filters.search,
        state.filters.name = filters.name,
        state.filters.author = filters.author,
        state.filters.price = filters.price,
        state.filters.sort = filters.sort
    },
    deleteItem (state, data) {
        state.dataListFiltered.data.splice(data.index, 1)
    },
}

export const actions = {
    async getDataList({ commit, state, dispatch }) {
        
        if(Object.keys(state.dataListFiltered).length == 0) {
            const [dataList] = await Promise.all ([
                this.$axios.$get('/tag/all'),
            ])
            commit('setDataList', dataList)
            commit('setDataListFiltered', null)
        } else {
            dispatch('getDataListFiltered')
        }

        // const [dataList] = await Promise.all ([
        //     this.$axios.$get('/tag/all'),
        // ])
        // if(Object.keys(state.dataListFiltered).length === 0) {
        //     commit('setDataList', dataList)
        //     commit('setDataListFiltered', null)
        // } else {
        //     dispatch('getDataListFiltered')
        // }
    },
    async deleteItem( vuexContext, data) {
        return await this.$axios.$delete('/tag/'+ data.id)
        .then((response) => {
            console.log(response);
            vuexContext.commit('deleteItem', data)
        }, (error) => {
            console.log(error);
        });
    },

    async getDataListFiltered(vuexContext, state) {
        return await this.$axios.$post('/tag/all', {
            "filters": vuexContext.state.filters
        })
        .then((response) => {
            console.log(response);
            vuexContext.commit('setDataListFiltered', response)
        }, (error) => {
            console.log(error);
        });
    },
}
