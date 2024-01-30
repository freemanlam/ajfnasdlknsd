const { deepEqual } = require('assert');

/**
 * @typedef {Map<string, string>} Graph
 * @typedef {string} Path
 * @typedef {Path[]} Paths
 */

/**
 * @type Graph
 */
const graph = new Map([
  ['A', 'BDH'],
  ['B', 'ACD'],
  ['C', 'BDF'],
  ['D', 'ABCE'],
  ['E', 'DFH'],
  ['F', 'CEG'],
  ['G', 'FH'],
  ['H', 'AEG'],
]);

/**
 * @param {Graph} graph
 * @param {string} from
 * @param {string} to
 * @param {Path} path
 * @param {Paths} paths
 * @returns {Paths}
 */
function a_allPossiblePaths(graph, from, to, path = '', paths = []) {
  const newPath = path + from;

  const neighbors = graph.get(from);
  let unvisitedNeighbors = '';
  for (let neighbor of neighbors) {
    if (path.indexOf(neighbor) === -1) {
      unvisitedNeighbors = unvisitedNeighbors + neighbor;
    }
  }

  const newPaths = [];
  for (let neighbor of unvisitedNeighbors) {
    if (neighbor === to) {
      newPaths.push(newPath + to);
    } else {
      // continue path finding
      newPaths.push(...a_allPossiblePaths(graph, neighbor, to, newPath, paths));
    }
  }

  return newPaths;
}

/**
 * @param {Graph} graph
 * @param {string} from
 * @param {string} to
 * @param {Path} path
 * @return {Path}
 */
function b_shortestPath(graph, from, to, path = '') {
  const newPath = path + from;

  if (graph.get(from)?.indexOf(to) !== -1) {
    return newPath + to;
  }

  const neighbors = graph.get(from);
  let unvisitedNeighbors = '';
  for (let neighbor of neighbors) {
    if (path.indexOf(neighbor) === -1) {
      unvisitedNeighbors = unvisitedNeighbors + neighbor;
    }
  }

  const paths = [];
  for (let negihbor of unvisitedNeighbors) {
    const res = b_shortestPath(graph, negihbor, to, newPath);
    if (res[res.length - 1] === to) {
      paths.push(res);
    }
  }

  // no possible paths
  if (paths.length < 0) {
    return '';
  }

  const shortestPath = paths.sort((a, b) => a.length - b.length)[0];

  return shortestPath;
}

function main() {
  const aResult = a_allPossiblePaths(graph, 'A', 'H');
  deepEqual(aResult, [
    'ABCDEFGH',
    'ABCDEH',
    'ABCFEH',
    'ABCFGH',
    'ABDCFEH',
    'ABDCFGH',
    'ABDEFGH',
    'ABDEH',
    'ADBCFEH',
    'ADBCFGH',
    'ADCFEH',
    'ADCFGH',
    'ADEFGH',
    'ADEH',
    'AH',
  ]);
  console.log('Question A answer:');
  console.log(aResult);

  const bResult = b_shortestPath(graph, 'A', 'H');
  deepEqual(bResult, 'AH');
  console.log('Question B answer:');
  console.log(bResult);
}

main();
