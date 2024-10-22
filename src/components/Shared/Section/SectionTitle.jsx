import React from 'react';

const SectionTitle = ({title}) => {
   return (
      <div className="text-center my-8">
         <h1 className="text-4xl font-bold font-primaryT my-3">{title}</h1>
         <p className="w-96 mx-auto font-medium font-primaryC">Let’s take a look at the most effective ways to come up with blog</p>
         <hr />
      </div>
   );
};

export default SectionTitle;