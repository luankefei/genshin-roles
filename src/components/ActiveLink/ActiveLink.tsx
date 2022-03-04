/**
 * @name ActiveLink
 * @desc next/Link 的基础上增加了 active 功能
 * @see https://reactrouter.com/docs/en/v6/examples/custom-link
 */

// TODO: 增加权限校验
import React, { Children } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

const AcitveLink = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const className = match ? "active" : undefined;
  const child = Children.only(children);

  return (
    <Link to={to} className={className} {...props}>
      {child}
    </Link>
  );
};

AcitveLink.defaultProps = {
  as: "",
};

export default AcitveLink;
