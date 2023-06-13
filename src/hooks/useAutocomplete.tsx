import { useEffect } from 'react';
import { Station, useStationInfo } from '../api/stations';

interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
}

const useAutocomplete = () => {
  const { data } = useStationInfo();

  const createTrieNode = () => ({
    children: new Map(),
    isEndOfWord: false,
  });

  const insert = (root: TrieNode, word: string) => {
    let node = root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children.has(char)) {
        node.children.set(char, createTrieNode());
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      node = node.children.get(char)!;
    }

    node.isEndOfWord = true;
  };
  const search = (root: TrieNode, prefix: string) => {
    let node = root;
    const result: string[] = [];

    // 접두사의 모든 문자를 Trie에서 찾음
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!node.children.has(char)) {
        return result;
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      node = node.children.get(char)!;
    }

    // DFS를 사용하여 접두사를 기준으로 모든 단어를 찾음
    const dfs = (node: TrieNode, prefix: string) => {
      if (node.isEndOfWord) {
        result.push(prefix);
      }

      node.children.forEach((childNode, char) => {
        dfs(childNode, prefix + char);
      });
    };

    dfs(node, prefix);

    return result;
  };
  const createAutocomplete = () => {
    const root = createTrieNode();

    // 단어 추가 함수
    const insertWord = (word: string) => {
      insert(root, word);
    };

    // 접두사 검색 함수
    const searchPrefix = (prefix: string): string[] => {
      return search(root, prefix);
    };

    return {
      insertWord,
      searchPrefix,
    };
  };

  const autocomplete = createAutocomplete();

  useEffect(() => {
    if (!data) return;
    data.map((station: Station) => autocomplete.insertWord(station.stationName));
  }, [autocomplete, data]);

  return { autocomplete };
};

export default useAutocomplete;
