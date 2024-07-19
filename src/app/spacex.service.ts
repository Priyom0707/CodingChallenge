import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpacexService {
  private readonly spacexApiUrl =
    'https://spacex-production.up.railway.app/graphql';

  constructor(private apollo: Apollo) {}

  // Fetches a list of upcoming launches
  getNextLaunches() {
    //Create a GraphQL query to load the data from API for Next Upcoming Launches
    const query = gql`
      query GetNextLaunches {
        launchesUpcoming {
          id
          mission_name
        }
      }
    `;
    return this.apollo
      .watchQuery<any>({
        query,
      })
      .valueChanges.pipe(map((result) => result.data.launchesUpcoming));
  }

  // Fetches details for a specific launch by ID
  getLaunchDetails(id: string) {
    //Create a GraphQL query to load the data from API for details of specific Launch selected by user
    const query = gql`
      query GetLaunchDetails($id: ID!) {
        launch(id: $id) {
          id
          mission_name
          launch_date_utc
          rocket {
            rocket_name
          }
        }
      }
    `;

    return this.apollo
      .watchQuery<any>({
        query,
        variables: { id },
      })
      .valueChanges.pipe(map((result) => result.data.launch));
  }
}
