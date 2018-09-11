import superagent from 'superagent'
import store from './../store.js'

function buildSuperAgent(method, endpoint) {
    var API_BASE = process.env.API_HOST;

    return superagent(method, API_BASE + endpoint)
            .ok(res => res.status < 500)
            .set('Authorization', `Token ${window.token}`)
            .on('error', (err, res) => {
                var message = err.message;

                // black magic
            })
}

export default {
    get: (endpoint) => buildSuperAgent('GET', endpoint),
    post: (endpoint) => buildSuperAgent('POST', endpoint),
    delete: (endpoint) => buildSuperAgent('DELETE', endpoint),
    patch: (endpoint) => buildSuperAgent('PATCH', endpoint),
    put: (endpoint) => buildSuperAgent('PUT', endpoint)
}