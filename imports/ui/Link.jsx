import React, { Component } from 'react';
import LinkListFilter from './LinkListFilter';
import LinksList from './LinksList';

import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

const Link = () => {
    return (
        <div className="page">
        	<PrivateHeader title={'Your Links'} />
            <div className="page-content">
            	<LinkListFilter />
          	  	<AddLink/>
            	<LinksList />
            </div>
         </div>
    )
}

export default Link;
