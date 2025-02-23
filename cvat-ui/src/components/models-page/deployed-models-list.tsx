// Copyright (C) 2020-2022 Intel Corporation
// Copyright (C) 2022-2023 CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd/lib/grid';
import { CombinedState } from 'reducers';
import { MLModel } from 'cvat-core-wrapper';
import { ModelProviders } from 'cvat-core/src/enums';
import DeployedModelItem from './deployed-model-item';

export default function DeployedModelsListComponent(): JSX.Element {
    const interactors = useSelector((state: CombinedState) => state.models.interactors);
    const detectors = useSelector((state: CombinedState) => state.models.detectors);
    const trackers = useSelector((state: CombinedState) => state.models.trackers);
    const reid = useSelector((state: CombinedState) => state.models.reid);
    const classifiers = useSelector((state: CombinedState) => state.models.classifiers);
    const models = [...interactors, ...detectors, ...trackers, ...reid, ...classifiers];
    const builtInModels = models.filter((model: MLModel) => model.provider === ModelProviders.CVAT);
    const externalModels = models.filter((model: MLModel) => model.provider !== ModelProviders.CVAT);
    externalModels.sort((a, b) => moment(a.createdDate).valueOf() - moment(b.createdDate).valueOf());

    const renderModels = [...builtInModels, ...externalModels];
    const items = renderModels.map((model): JSX.Element => <DeployedModelItem key={model.id} model={model} />);

    return (
        <>
            <Row justify='center' align='middle'>
                <Col md={22} lg={18} xl={16} xxl={16} className='cvat-models-list'>
                    {items}
                </Col>
            </Row>
        </>
    );
}
