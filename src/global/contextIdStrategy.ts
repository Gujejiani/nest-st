import {
    HostComponentInfo,
    ContextId,
    ContextIdFactory,
    ContextIdStrategy,
  } from '@nestjs/core';
  import { Request } from 'express';
  
  const tenants = new Map<string, ContextId>();
  /**
   * This strategy is used to aggregate contextId by tenantId in the request header.
   * It creates a new contextId for each tenantId and stores it in a map.
   * If the tenantId is already in the map, it returns the stored contextId.
   * If the tenantId is not in the map, it creates a new contextId and stores it in the map.
   * @param contextId
   * @param request
   * @returns a function that returns the stored contextId if the tenantId is already in the map.
   * Otherwise, it creates a new contextId and stores it in the map.
   * If the tree is not durable, it returns the original "contextId" object.
   * 
   */
  export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
    attach(contextId: ContextId, request: Request) {
      const tenantId = request.headers['x-tenant-id'] as string;
      let tenantSubTreeId: ContextId;
  
      if (tenants.has(tenantId)) {
     
        tenantSubTreeId = tenants.get(tenantId) as ContextId;
        console.log('tenantId found', tenantSubTreeId)
      } else {
        console.log('tenantId not found', tenantId)
        tenantSubTreeId = ContextIdFactory.create();
        tenants.set(tenantId, tenantSubTreeId);
      }
  
      // If tree is not durable, return the original "contextId" object
      return (info: HostComponentInfo) =>
        info.isTreeDurable ? tenantSubTreeId : contextId;
    }
  }