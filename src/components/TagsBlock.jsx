import React from 'react';
import { Link } from 'gatsby';

const TagsBlock = ({ tags }) => {
  return (
    <div>
      {tags.map(tag => (
        <Link key={tag} to={`/tags/${tag}`}>
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default TagsBlock;
